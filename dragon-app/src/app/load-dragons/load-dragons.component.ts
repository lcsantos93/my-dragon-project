import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models/user';
import { Dragon} from '@/_models/dragon';

import { AuthenticationService } from '@/_services/authentication.service';
import { DragonService } from '@/_services/dragon.service';

@Component({ selector: 'display-dragons', templateUrl: 'load-dragons.component.html' })
export class LoadDragonsComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  dragons: Dragon[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private DragonService: DragonService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllDragons();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteDragon(slug: string) {
    this.DragonService.delete(slug).pipe(first()).subscribe(() => {
      this.loadAllDragons()
    });
  }

  private loadAllDragons() {
    this.DragonService.getAll().pipe(first()).subscribe(dragons => {
      this.dragons = dragons['items'];
    });
  }
}