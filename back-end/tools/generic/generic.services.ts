import mongoose from 'mongoose';


import { MongoDb, mongoDB } from '../mongo/mongo';
import { IResult } from './generic.interfaces';
import { ObjectId } from 'mongodb';
import { config } from '../config/config';



export class GenericServices {
     public api: string = "";

     //#region INICIALIZE

     public async comandMongo() { return await this.searchAll({ id: null }); };

     public async convertData(obj: any) { return obj; };

     public async beforeInsert(obj: any) { return obj; };

     //#endregion

     //#region CRUD

     public OkResult<TModelo>(obj: TModelo): IResult<TModelo> {
          return <IResult<TModelo>>{ success: true, data: obj }
     };

     public InvalidResult<TModelo>(message: string) {
          return <IResult<TModelo>>{ success: false, message: message };
     };

     public getCollection(): mongoose.Collection {
          return mongoDB.getCollection(this.api);
     };

     public insert<TModelo>(obj: any) {
          return new Promise(async (resolve, reject) => {
               var id = obj._id

               await this.getCollection().findOne({ _id: new ObjectId(id) }).then(async response => {

                    if (!response) {
                         await this.getCollection().insertOne(obj);
                         resolve(this.OkResult('Inserido com successo.'))
                    };

                    if (response) {
                         await this.getCollection().updateOne({ _id: id }, obj);
                         resolve(this.OkResult('Atualizado com sucesso.'))
                    };

               });

               resolve(true);
          });
     };

     public edit<TModelo>(obj: any) {
          return new Promise(async (resolver, reject) => {
               var id = obj._id;

               await this.getCollection().findOneAndUpdate({ _id: new ObjectId(id) }, { $set: obj }, { upsert: true })

               resolver(this.OkResult('Atualizado com successo.'));
          });
     };

     public delete<TModelo>(objectId: ObjectId) {
          return new Promise(async (resolve, reject) => {

               await this.getCollection().deleteOne({ _id: objectId });

               resolve(this.OkResult('Excluido com successo.'));
          });
     };

     public search<TModelo>(objectId: ObjectId) {
          return new Promise(async (resolve, reject) => {

               var response = await this.getCollection().find({ _id: objectId });

               resolve(this.OkResult(response));
          });
     };

     public searchOne<TModelo>(objectId: ObjectId) {
          return new Promise(async (resolve, reject) => {

               var response = await this.getCollection().findOne({ _id: objectId });

               if (response) return resolve(this.InvalidResult("Nenhum registro encontrado!"));

               resolve(this.OkResult(response));
          });
     };

     public searchAll<TModelo>(query: { [key: string]: any; } | { [x: string]: any; }, sort?: { [key: string]: any }): Promise<IResult<any>> {
          return new Promise(async (resolve, reject) => {
               var response;

               if (sort) {
                    response = await this.getCollection().find(query).sort(sort).toArray();
               };
               if (!sort) {
                    response = await this.getCollection().find(query).toArray();
               };

               resolve(this.OkResult(response));
          })
     };

     public searchFirst<TModelo>(query: { [key: string]: any; } | { [x: string]: any; }): Promise<IResult<TModelo>> {
          return new Promise(async (resolve, reject) => {
               await this.getCollection().findOne(query).then((response: TModelo) => {
                    if (!response) return resolve(this.InvalidResult("Item não encontrado."));

                    resolve(this.OkResult(response));
               });
          })
     };

     public onSalvar<TModelo>(obj: any, query: { [x: string]: any; }) {
          return new Promise(async (resolve, reject) => {
               var response = await this.beforeInsert(obj);

               var value = await this.getCollection().findOne(query);

               if (value != null) {
                    response._id = value._id;
                    await this.getCollection().updateOne({ _id: response._id }, { $set: obj }, { upsert: true });
               };

               if (value === null) await this.getCollection().insertOne(response);

               resolve(this.OkResult(response));
          });
     };

     public InsertIfNotExist<TModelo>(obj: any, query: { [x: string]: any; }) {
          return new Promise(async (resolve, reject) => {
               var response = await this.getCollection().findOne(query);

               if (response != null) {
                    obj._id = response._id;

                    await this.getCollection().updateOne({ _id: obj._id }, { $set: obj }, { upsert: true }).then(response => {
                         resolve(this.OkResult(obj));
                    });
               };

               if (response == null) {
                    var insert = await this.getCollection().insertOne(obj);
                    resolve(insert);
               };

          });
     };

     //#endregion

     //#region METHODS

     // private getUrl(url: string): string {
     //      return `http://${config.server.host}:${config.server.port}/${url}`;
     // };

     //#endregion 

};