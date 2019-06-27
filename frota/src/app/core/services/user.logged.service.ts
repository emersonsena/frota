import {Injectable} from '@angular/core';
import {UserLogged} from '../models/user-logged';
//import {AUTHENTICATION_TOKEN} from '../../settings/pescattu.api';
import {Response} from '../models/response';
//import {systemUrls} from '../../settings/pescattu.urls';

@Injectable()
export class UserLoggedService {

  public static instance: UserLoggedService = null;
  user: UserLogged;

  constructor() {
    return UserLoggedService.instance = UserLoggedService.instance || null;
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new UserLoggedService();
    }
    return this.instance;
  }

  isLogged(): boolean {
  //  if (localStorage.getItem(AUTHENTICATION_TOKEN)) {
    //  return true;
  //  }
    return false;
  }

  removeAuthToken() {
  //  localStorage.removeItem(AUTHENTICATION_TOKEN);
    this.user = null;
  }

  getUserLogged() {
    if (this.isLogged()) {
    //  this.user = JSON.parse(localStorage.getItem(AUTHENTICATION_TOKEN));
      return this.user;
    }
    this.removeAuthToken();
  }

  getUserPermission() {
    const userLogged = this.getUserLogged();
    return userLogged.permission[0];
  }

  getUserToken() {
    const userLogged = this.getUserLogged();
    return userLogged.token;
  }

  saveInSession(response: Response) {
    console.log(response);
    const userLogged = new UserLogged();
    userLogged.id = response['data']['id'];
    userLogged.token = response['data']['token'];
    userLogged.nome = response['data']['nome'];
    userLogged.permission = response['data']['permissoes'];
    userLogged.expire = this.sumSevenDays().valueOf();
  //  localStorage.setItem(AUTHENTICATION_TOKEN, JSON.stringify(userLogged));
  }

  isValid(): boolean {
    return this.isLogged() && this.isTokenValid();
  }

  isTokenValid(): boolean {
    if (this.getUserToken() !== undefined && this.getUserToken() !== null) {
      return this.isUserTokenExpired(this.getUserLogged().expire);
    }
    return false;
  }

  private isUserTokenExpired(timestamp: number): boolean {
    const dateToken = new Date(timestamp);
    const now = new Date();
    let isValid = true;

    if (now > dateToken) {
      isValid = false;
    }
    return isValid;
  }

  private sumSevenDays() {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  }

  hasPermissionTo(urlSource: string): boolean {
    const perfil = this.getUserPermission();
    if (this.isUrlExitsTo(perfil, urlSource)) {
      return true;
    }
    return false;
  }


  private isUrlExitsTo(perf: string, url: string): boolean {
    // regex para validar o formato da url.
    const re = /^(\/[a-zA-Z0-9-_]+)(\/\w+)$/;

    // retorna as urls pelo perfil.
  //  const urls = systemUrls.find(perfil => perfil.perf === perf);

    // verificar se o prefil pode acessar a url.
    //const isExists = urls.rotas.find(x =>
    //  url.replace(re, '$1').endsWith(x.toString()));

    return null;
//    isExists !== undefined && isExists !== null;
  }


}
