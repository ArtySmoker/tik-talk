import { Component, inject } from '@angular/core';
import { SvgIconComponent } from "../svg-icon/svg-icon.component";
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor, RouterLink, ImgUrlPipe, SubscriberCardComponent,AsyncPipe,JsonPipe,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)

  subscribers$ = this.profileService.getSubscriberShortList()

  me = this.profileService.me
  
  menuItems = [
    {
      label: 'Моя страница',
      icon:'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon:'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon:'search',
      link: 'search'
    }
  ]


  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
