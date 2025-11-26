import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';
import { LanguageNamePipe } from '../../pipes/language-name.pipe';
import { TimePipe } from '../../pipes/time.pipe';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [CommonModule, RouterLink, NumberWithCommasPipe, LanguageNamePipe, TimePipe],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss'
})
export class MediaComponent {
  @Input() data: any;
  @Input() externalData: any;
  @Input() type: 'movie' | 'tv' | 'person' = 'movie';
}
