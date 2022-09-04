import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { eInSessaoStorage } from 'src/app/enums/storage.enums';
import { ICarrouselBootstrap } from 'src/app/interfaces/carrousel-bootstrap.interfaces';
import { ILoginParametros } from 'src/app/interfaces/login.interfaces';
import { LoginService } from 'src/app/services/login/login.service';
import { IButtonEvent } from 'src/app/widgets/button-event/button-event.interfaces';
import { ButtonEventService } from 'src/app/widgets/button-event/button-event.service';
import { CarrouselBootstrapService } from 'src/app/widgets/util/carrousel-bootstrap.service';
import { PagesBase } from 'src/app/widgets/util/pages.base';
import { PagesService } from 'src/app/widgets/util/pages.service';
import { ValidacaoForms } from 'src/app/widgets/util/validators';

declare const $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends PagesBase implements OnInit, AfterViewInit {

  carrousel: ICarrouselBootstrap;
  showButtonVoltar: boolean = false;
  buttonEmail: IButtonEvent;
  buttonAcessar: IButtonEvent;
  authForm: FormGroup;

  constructor(
    public pagesService: PagesService,
    private carrouselBootstrapService: CarrouselBootstrapService,
    private buttonEventService: ButtonEventService,
    private loginService: LoginService
  ) {
    super(pagesService)

    this.inicializarFormulario();

    this.carrousel = this.carrouselBootstrapService.inicialize('auth');
  };

  ngAfterViewInit(): void {
    $(`#${this.carrousel.widgetID}`).on('slide.bs.carousel', (e: any) => {
      this.showButtonVoltar = e.to > 0;
    });
  };

  ngOnInit(): void {
    this.buttonEmail = this.buttonEventService.inicialize(<IButtonEvent>{ text: 'Continuar' });
    this.buttonAcessar = this.buttonEventService.inicialize(<IButtonEvent>{ text: 'Acessar' });


    this.buttonEmail.response = () => {
      this.nextCarrousel();
    };

    this.buttonAcessar.response = () => {
      this.acessar();
    };

  };

  public async acessar() {
    if (this.authForm.invalid) return;

    let parametros = <ILoginParametros>{
      email: this.authForm.get('email').value,
      password: this.authForm.get('password').value
    };

    this.buttonAcessar.inicializeLoading();

    await firstValueFrom(this.loginService.v1Login(parametros)).then(result => {
      if (!result.success) return this.authForm.get('password').setErrors({ invalido: true });

      this.pagesService.hairSalonTokenService.setKey(eInSessaoStorage.Session, result.data);

      this.pagesService.routerService.navigate('home');
    }).finally(() => { this.buttonAcessar.closeLoading(); })

  };

  public validate(name: string, erro?: string): boolean {
    if (erro) return this.authForm.get(name).hasError(erro);

    return this.authForm.get(name).touched && this.authForm.get(name).invalid;
  };

  public inicializarFormulario() {
    this.authForm = this.pagesService.formBuilder.group({
      email: [null, [Validators.required, ValidacaoForms.validar(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)]],
      password: [null, Validators.required],
      access: [null]
    });
  };

  public nextCarrousel() {
    let pagina = Number(this.carrousel.paginaAtual());

    if (pagina < 2) this.carrousel.onNext();
  };

  public prevCarrousel() {
    let pagina = Number(this.carrousel.paginaAtual());

    if (pagina === 1) {
      this.authForm.reset();
    };

    if (pagina === 2) {
      this.authForm.get('password').reset();
      this.buttonEmail.closeLoading();
    };

    this.carrousel.onPrev();
  };

}
