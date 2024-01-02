import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;
  activeSectionId: string | null = null;

  ngOnInit() {
    this.activeSectionId = 'home';
    this.setActiveSection();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.setActiveSection();
    this.setStickyHeader();
  }

  setActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    sections.forEach(sec => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        this.activeSectionId = id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });

    if (!this.activeSectionId) {
      const contactLink = document.querySelector('header nav a[href="#contact"]');
      if (contactLink) {
        contactLink.classList.add('active');
      }
    }
  }

  setStickyHeader() {
    const header = document.querySelector('header');
    if (header) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      header.classList.toggle('sticky', scrollY > 100);
    }
  }

  handleMenuToggle() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon?.classList.toggle('bx-x');
    navbar?.classList.toggle('active');

    this.isMenuOpen = !this.isMenuOpen;
  }

  handleNavLinkClick(event: Event) {
    const clickedLink = event.target as HTMLElement;
    const id = clickedLink.getAttribute('href')?.substring(1);
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (id) {
      this.activeSectionId = id;
      this.scrollToSection(id);
    }

    menuIcon?.classList.remove('bx-x');
    navbar?.classList.remove('active');
    this.isMenuOpen = false;

    event.preventDefault();
  }


  scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

