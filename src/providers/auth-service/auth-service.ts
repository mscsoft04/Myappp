import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';





/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let rootUrl = "http://122.165.104.216/WelcomeGroup/v3/api/";

@Injectable()

export class AuthServiceProvider {


  constructor(public http: HttpClient) {
    //console.log('Hello AuthServiceProvider Provider');
  }


  PostApi(data,url){
  //let reqHeader = new HttpHeaders({'No-Auth':'True'});
  //console.log("DATA:"+data+"URL:"+url);

  return this.http.post(rootUrl+url,data);
  }
  GetApi(url){
	// var reqHeader = new HttpHeaders({'No-Auth':'True'});
	return this.http.get(rootUrl+url);
  }
  PutApi(data,url,where){
	 //var reqHeader = new HttpHeaders({'No-Auth':'True'});
	return this.http.put(rootUrl+url+'/'+where,data);
  }

}
