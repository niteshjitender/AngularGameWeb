import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games: Array<Game> | undefined ;
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  constructor(
    private httpsService : HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']) ;
      }
      else {
        this.searchGames('metacrit') ;
      }
    });  
  }

  searchGames(sort: string, search?: string):void {
    this.httpsService
      .getGameList(sort,search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results ;
        console.log(gameList) ;
      }) ;
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details',id]) ;
  }
  
  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe() ;
    }
    
    if(this.routeSub){
      this.routeSub.unsubscribe() ;
    }
  }
}
