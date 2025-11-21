import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HugeiconsIconComponent } from '@hugeicons/angular'
import { Linkedin01Icon } from '@hugeicons/core-free-icons'
import { SmartPhone02FreeIcons } from '@hugeicons/core-free-icons'
import { Mail01Icon } from '@hugeicons/core-free-icons'


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [HugeiconsIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  Linkedin01Icon = Linkedin01Icon;
  SmartPhone01Icon = SmartPhone02FreeIcons;
  Mail01Icon = Mail01Icon
}
