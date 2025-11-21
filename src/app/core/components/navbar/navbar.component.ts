import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef;

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
  }
}
