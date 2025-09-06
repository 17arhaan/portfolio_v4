# Arhaan Girdhar's Portfolio

<div align="center">

![Portfolio Preview](public/sign.png)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

A modern, responsive portfolio website showcasing my projects, skills, and experience. Optimized for performance with Docker support.

[Live Demo](https://arhaan.vercel.app) • [Report Bug](https://github.com/17arhaan/Portfolio_v4/issues) • [Request Feature](https://github.com/17arhaan/Portfolio_v4/issues)

</div>

## ✨ Features

- 🌙 Modern and sleek design with dark theme
- 📱 Fully responsive layout for all devices
- ⚡ Built with Next.js 15 and TypeScript
- 🎨 Styled with Tailwind CSS
- 🎭 Smooth animations using Framer Motion
- 📊 Interactive project showcases
- 📝 Dynamic content management
- 🔍 SEO optimized
- 🚀 Fast performance and optimized loading
- 📬 Contact form with email integration
- 🎯 Custom cursor effects
- 🌟 Particle animations and gradient effects
- 🐳 Docker support for easy deployment
- 🎯 Performance optimizations (LCP, CLS, FID)

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Containerization:** [Docker](https://www.docker.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.8 or later
- npm, yarn, or pnpm
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/17arhaan/Portfolio_v4.git
```

2. Navigate to the project directory
```bash
cd Portfolio_v4
```

3. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Set up environment variables (required for GitHub stats)
```bash
# Create a .env.local file in the root directory
cp .env.local.example .env.local
```

6. Configure your GitHub token in `.env.local`:
```bash
GITHUB_TOKEN=your_github_personal_access_token_here
```

   **To get a GitHub Personal Access Token:**
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Portfolio Stats"
   - Select these scopes:
     - `public_repo` (to read public repository information)
     - `read:user` (to read user profile information)
   - Copy the generated token to your `.env.local` file

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# Build and run the production container
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### Development with Docker

```bash
# Run development server with hot reload
docker-compose --profile dev up

# This will run on http://localhost:3001
```

### Manual Docker Commands

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio

# Build development image
docker build -f Dockerfile.dev -t portfolio-dev .

# Run development container with volume mounting
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules portfolio-dev
```

## 🔧 Performance Optimizations

This portfolio includes several performance optimizations:

### Images
- **Next.js Image Optimization**: Automatic WebP/AVIF conversion
- **Lazy Loading**: Images load as they enter the viewport
- **Blur Placeholders**: Smooth loading experience
- **Responsive Images**: Proper sizing for different devices

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Technical Optimizations
- **Bundle Splitting**: Automatic code splitting
- **Font Optimization**: Preloaded Google Fonts
- **Animation Performance**: GPU-accelerated animations
- **Compression**: Gzip/Brotli compression enabled

## 📁 Project Structure

```
Portfolio_v4/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── about-section.tsx
│   │   ├── hero-section.tsx
│   │   └── ...
│   └── ui/
│       ├── optimized-motion.tsx
│       ├── image-with-skeleton.tsx
│       └── ...
├── public/
│   └── assets/
├── Docker files
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── docker-compose.yml
│   └── .dockerignore
└── package.json
```

## 🎨 Customization

1. **Personal Information**
   - Update your information in `app/page.tsx`
   - Modify the content in the respective sections

2. **Styling**
   - Customize colors and themes in `app/globals.css`
   - Modify Tailwind configuration in `tailwind.config.js`

3. **Projects**
   - Add your projects in the projects section
   - Update project images in the `public` directory

4. **Performance**
   - Images are automatically optimized
   - Animations use optimized motion components
   - Lazy loading is enabled by default

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktop screens (1024px+)
- 🖥️ Large displays (1920px+)

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Create a new project on Vercel
3. Import your forked repository
4. Deploy!

### Docker Deployment
```bash
# Production deployment
docker-compose up -d

# Scale if needed
docker-compose up -d --scale portfolio=3
```

### Other Platforms
The Docker image can be deployed on any platform that supports containers:
- AWS ECS/EKS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tags for better SEO
- **Open Graph**: Social media preview optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD markup for rich snippets
- **Sitemap**: Automatic sitemap generation
- **Performance**: Fast loading for better search rankings

## 📊 Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **Speed Insights**: Real user metrics
- **Core Web Vitals**: Automated tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [Lucide Icons](https://lucide.dev/) - For beautiful icons
- [Vercel](https://vercel.com/) - For hosting and deployment

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/17arhaan">Arhaan Girdhar</a></p>
</div> 