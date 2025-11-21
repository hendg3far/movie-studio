import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { SafePipe } from '../../pipes/safe.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() videoUrl: string = ''; // URL of YouTube video
  @Input() modalId: string = 'genericModal'; // unique ID for multiple instances

  modalInstance: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    const modalEl = this.el.nativeElement.querySelector(`#${this.modalId}`);
    if (!modalEl) return;

    // Initialize Bootstrap modal
    this.modalInstance = new bootstrap.Modal(modalEl);

    // Show modal
    this.modalInstance.show();

    // Stop video when modal closes
    modalEl.addEventListener('hidden.bs.modal', () => {
      const iframe: HTMLIFrameElement = modalEl.querySelector('iframe');
      if (iframe) iframe.src = '';
    }, { once: true });
  }

  ngOnDestroy() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}
