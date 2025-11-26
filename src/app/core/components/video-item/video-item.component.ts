import { Component, Input, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.scss'
})
export class VideoItemComponent {
  @Input() videoData: any[] = [];
  @Input() videoType: any[] = [];

  constructor(private vcr: ViewContainerRef) { }

  openVideoModal(videoKey: string): void {
    const videoUrl = `https://www.youtube.com/embed/${videoKey}?rel=0&autoplay=1&mute=1`;
    const componentRef = this.vcr.createComponent(ModalComponent);
    componentRef.instance.videoUrl = videoUrl;
  }
}
