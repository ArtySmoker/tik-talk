import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from "../../common-ul/profile-header/profile-header.component";
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgForOf } from '@angular/common';
import { SvgIconComponent } from "../../common-ul/svg-icon/svg-icon.component";
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";
import { PostFeedComponent } from "./post-feed/post-feed.component";
import { SettingsPageComponent } from '../settings-page/settings-page.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ProfileHeaderComponent, AsyncPipe, SvgIconComponent, RouterLink, NgForOf, ImgUrlPipe, PostFeedComponent,SettingsPageComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  subscribers$ = this.profileService.getSubscriberShortList(5)
  me$ = toObservable(this.profileService.me)

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.me$
        
        return this.profileService.getAccount(id)

      })
    )
}
