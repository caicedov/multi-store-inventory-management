<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/caicedov/multi-store-inventory-management">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Multi Store Inventory Management</h3>
  <p align="center">
    A modern web application for managing inventory across multiple store locations.
    <br />
    <a href="https://github.com/caicedov/multi-store-inventory-management"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo (Work-In-Progress)</a>
    ·
    <a href="https://github.com/caicedov/multi-store-inventory-management/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/caicedov/multi-store-inventory-management/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#roadmap">Roadmap</a>
      <ul>
        <li><a href="#essential-features">Essential features</a></li>
        <li><a href="#optional-features">Optional features</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## 💻About The Project

This project is a modern **Next.js 15** web application designed to streamline inventory management across multiple store locations. It allows businesses to efficiently track stock levels, manage inter-store transfers, and record sales with ease.

**Key Features:**
- Role-based access control (RBAC) for admin and seller roles
- Inventory tracking for multiple stores
- Secure, protected routes for managing stock
- Real-time updates and movement history
- Responsive design adaptable to desktop, tablet, and mobile

### 🚀Built With

* [![Next][Next.js]][Next-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
* [![Prisma][Prisma]][Prisma-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Biome][Biome]][Biome-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## ⚡️Getting Started

To get a local copy up and running, follow these steps.

### 🔨 Prerequisites

You will need **Node.js** and **npm** installed. You can check if you have them installed by running:

```bash
node -v
npm -v
```

If you don't have them installed, you can download them from [here](https://nodejs.org/en/download/).

### ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/caicedov/multi-store-inventory-management.git
```

2. Navigate to the project directory:

```bash
cd multi-store-inventory-management
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add the following variables:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/database
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 🧪Usage

To run the application, use the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

#### Examples (Work-In-Progress section)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## 🎯 Roadmap

### Essential features

- [ ] User authentication
- [ ] Role-based access control (RBAC)
- [ ] Inventory Tracking for Multiple Stores
- [ ] Secure, Protected Routes for Inventory Management
- [ ] Recording and Tracking Inter-Store Transfers
- [ ] Sales Registration for Products
- [ ] Responsive Design for Desktop, Tablet, and Mobile
- [ ] Real-Time Updates and Movement History

### Optional features
- [ ] Batch Operations Support for Inventory Management
- [ ] Product Categorization for Enhanced Organization
- [ ] Low Stock Alerts via Notifications
- [ ] Analytics Dashboard for Inventory Insights
- [ ] Export Functionality (CSV, Excel, etc.) for Reports
- [ ] Search and Filter Options for Products
- [ ] Advanced Reporting Features (Sales Reports, Stock Movement Reports)
- [ ] User Activity Logs for Tracking Changes

See the [open issues](https://github.com/caicedov/multi-store-inventory-management/issues) for a list of proposed features (and known issues).

## 👍 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## 🧾 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## 📥Contact

Victor Caicedo - [@soyelparce_](https://twitter.com/soyelparce_) - victorcaiicedo@gmail.com

Project Link: [https://github.com/caicedov/multi-store-inventory-management](https://github.com/caicedov/multi-store-inventory-management)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/caicedov/multi-store-inventory-management?style=for-the-badge
[contributors-url]: https://github.com/caicedov/multi-store-inventory-management/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/caicedov/multi-store-inventory-management.svg?style=for-the-badge
[forks-url]: https://github.com/caicedov/multi-store-inventory-management/network/members
[stars-shield]: https://img.shields.io/github/stars/caicedov/multi-store-inventory-management.svg?style=for-the-badge
[stars-url]: https://github.com/caicedov/multi-store-inventory-management/stargazers
[issues-shield]: https://img.shields.io/github/issues/caicedov/multi-store-inventory-management.svg?style=for-the-badge
[issues-url]: https://github.com/caicedov/multi-store-inventory-management/issues
[license-shield]: https://img.shields.io/github/license/caicedov/multi-store-inventory-management.svg?style=for-the-badge
[license-url]: https://github.com/caicedov/multi-store-inventory-management/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/victorcaicedoc/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TypeScript]: https://shields.io/badge/TypeScript-000000?logo=TypeScript&logoColor=FFF&style=for-the-badge
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-000000?&logo=tailwindcss&logoColor=white&style=for-the-badge
[TailwindCSS-url]: https://tailwindcss.com/
[Prisma]: https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[PostgreSQL]: https://img.shields.io/badge/postgresql-000000?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Biome]: https://img.shields.io/badge/Biome-000000?style=for-the-badge&logo=biome&logoColor=white&width=200
[Biome-url]: https://biomejs.dev/
