# Furniture E-commerce Website

An e-commerce platform built with Next.js and Tailwind CSS, simulating real-world application challenges. The platform allows users to browse, search, and purchase furniture products while providing a seamless and user-friendly experience.

## Features

- **User Authentication**: Implemented secure user authentication using NextAuth.js.
- **Database Management**: Utilized PostgreSQL via Supabase for efficient and scalable data storage.
- **Dynamic Product Display**: Showcases furniture products with category-based filtering and a sale page.
- **Responsive Design**: Designed with Tailwind CSS to ensure optimal user experience across devices.
- **Form Validation**: Integrated React Hook Form for robust input validation.
- **Optimized Images**: Reduced image sizes for fast load times without compromising quality.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React-based framework for server-rendered and static websites)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS framework)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (authentication for Next.js applications)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.io/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) (lightweight form library)

## Installation and Setup

To run the project locally, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/melci7/furniture-project.git
   cd furniture-project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.


## Screenshots

Include screenshots of your application to showcase its features. For example:

![Homepage Screenshot](https://imgur.com/y3Nfmly)
![Product Details Screenshot](https://imgur.com/fmEVW6v)
![Shopping Cart Screenshot](https://imgur.com/M6jWQIT)
![Order Summary Screenshot](https://imgur.com/iE7b9QC)

If you have any questions or need further assistance, feel free to contact me:

- Email: [melci721@gmail.com](mailto:melci721@gmail.com)
- LinkedIn: [Adar Kayalık](https://www.linkedin.com/in/adar-kayalık/)
