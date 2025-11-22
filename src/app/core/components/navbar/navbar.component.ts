import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ← Import this
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  searchVisible = false;
  query: string = '';

  @ViewChild('navbar') navbar!: ElementRef;
  @ViewChild('input') inputElement!: ElementRef;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    const navElement = this.navbar.nativeElement;

    gsap.timeline({
      scrollTrigger: {
        trigger: navElement,
        start: 'bottom top',
        toggleActions: 'play none none reverse'
      }
    })
      .fromTo(
        navElement,
        { backgroundColor: 'transparent' },
        {
          backgroundColor: '#00000070',
          backdropFilter: 'blur(10px)',
          duration: 1,
          ease: 'power1.inOut'
        }
      );

    if (this.searchVisible && this.inputElement) {
      this.focusInput();
    }
  }


  toggleSearch(): void {
    this.searchVisible = !this.searchVisible;
    if (this.searchVisible) {
      this.focusInput();
    }
  }

  private focusInput(): void {
    setTimeout(() => {
      if (this.inputElement && this.inputElement.nativeElement) {
        this.inputElement.nativeElement.focus();
        this.inputElement.nativeElement.select();
      }
    }, 100);
  }


  closeSearch(): void {
    this.searchVisible = false;
    this.query = '';
    this.router.navigate(['/']);
  }



  goToRoute(): void {
    if (this.query.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.query } });
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.query = '';
    this.router.navigate(['/']);
  }

  unFocus(event: FocusEvent): void {
    this.closeSearch();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.goToRoute();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (this.searchVisible && !targetElement.closest('.navbar')) {
      this.closeSearch();
    }
  }
}
