# My Projects Portfolio Website

A modern, professional portfolio website to showcase your web projects with a sleek design and interactive features.

## Features

✨ **Modern Design**
- Clean, contemporary UI with gradient backgrounds
- Smooth animations and hover effects
- Responsive design that works on all devices

🎯 **Interactive Elements**
- Clickable project cards that open detailed modal views
- Direct links to view each project website
- Smooth scrolling navigation

📱 **Fully Responsive**
- Mobile-friendly layout
- Works perfectly on tablets, phones, and desktops
- Optimized for all screen sizes

## File Structure

```
Projects website/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## How to Use

### 1. Open the Website
Simply open `index.html` in your web browser.

### 2. Add Your Projects

Edit the `script.js` file and add your projects to the `projects` array:

```javascript
const projects = [
    {
        id: 1,
        title: "Your Project Title",
        description: "A brief description of your project",
        image: "https://link-to-your-image.jpg", // or path to local image
        url: "https://your-website-url.com",
        tag: "Category/Type"
    },
    // Add more projects...
];
```

### Project Properties

- **id**: Unique number for each project
- **title**: Name of your project
- **description**: Brief description (2-3 sentences)
- **image**: URL or path to project screenshot/preview image
- **url**: Direct link to your project website
- **tag**: Category or type (e.g., "E-Commerce", "Blog", "Dashboard")

### 3. Example Projects

I've included 6 example projects using placeholder images from Unsplash. Replace them with:

- Screenshots of your actual projects
- Images from your web projects
- Local image files (save to the same folder)

### Using Local Images

If you want to use images stored locally:

1. Place your images in the same folder as the HTML file
2. Update the `image` property to use the filename:

```javascript
image: "my-project-screenshot.jpg"
```

## Customization

### Colors

The design uses a color scheme defined in `styles.css`. To change colors, edit the CSS variables at the top:

```css
:root {
    --primary-color: #6366f1;        /* Purple-blue */
    --secondary-color: #8b5cf6;      /* Purple */
    --accent-color: #ec4899;         /* Pink */
    --dark-bg: #0f172a;              /* Dark background */
    /* ... other colors ... */
}
```

### Sections

The website has these main sections:
- **Navigation Bar**: Logo and navigation links
- **Hero Section**: Welcome banner with CTA button
- **Projects Grid**: Your project showcase
- **Contact Section**: Optional contact area
- **Footer**: Copyright information

### Text Content

To customize text:
- Edit the HTML content in `index.html`
- Change section titles, descriptions, and contact info as needed

## How It Works

1. **Project Cards**: Click any project card to open a detailed modal
2. **Modal View**: Shows the project image, full description, and a "Visit Website" button
3. **Direct Links**: Click "Visit Website" to open the actual project in a new tab
4. **Responsive Design**: The layout automatically adjusts for different screen sizes

## Tips for Best Results

✓ Use high-quality preview images (at least 500x300px)
✓ Keep project descriptions concise and engaging
✓ Use consistent tag names for better organization
✓ Test the links to ensure they work correctly
✓ Make sure project URLs are complete (include https://)

## Browser Compatibility

Works on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

To host this website online:

1. **GitHub Pages**: Upload files to a GitHub repository and enable Pages
2. **Netlify**: Drag and drop your folder
3. **Vercel**: Connect your repository
4. **Traditional Hosting**: FTP upload to your web server

## Questions?

If you need to add more projects or customize further, just:
1. Add new entries to the `projects` array in `script.js`
2. Update the images and URLs
3. Refresh your browser to see changes

Enjoy your portfolio website! 🚀
