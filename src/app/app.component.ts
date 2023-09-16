import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(): void {
    initFlowbite();
  }

  imageLogoBlack = 'assets/images/logo/full_logo_black.png';

  title = 'nexus-meet-system';

}
