# Wedding Website

A modern, elegant wedding website with a magical blue theme. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy hosting on GitHub Pages.

## Features

- Responsive design that works on all devices
- Continuous scrolling blue glitter background
- Accessible and easy to read
- RSVP system with QR code validation
- Google Maps integration
- Registry/gift management
- Future livestream capability
- Mobile-friendly navigation

## Development

### Local Testing

#### Option 1: Simple Python Server
The easiest way to test locally:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.


### File Structure

```
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── img/
│   ├── Blue-glitter.jpg
│   └── [other images]
├── index.html
├── server.py
└── README.md
```

### Customization

#### Images
- Replace images in the `img/` directory
- Image references are clearly marked in the HTML and CSS files
- Use descriptive names for new images

#### Colors
- Main color scheme is defined in CSS variables in `css/styles.css`
- Easily modify the color scheme by updating the variables

#### Content
- Edit `index.html` to update text content
- Sections are clearly marked with comments
- Each section is modular and can be modified independently

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push this code to your repository
3. Go to repository Settings > Pages
4. Select your main branch as the source
5. Your site will be available at `https://[username].github.io/[repository-name]`

### Custom Domain (Optional)

1. Purchase a domain name
2. Add a CNAME record pointing to your GitHub Pages URL
3. Add your custom domain in the GitHub Pages settings
4. Add a CNAME file to your repository with your domain name

## Security

- No sensitive information is stored in the code
- RSVP system uses secure validation
- All external resources use HTTPS
- Modern security headers are implemented

## Accessibility

- ARIA labels for interactive elements
- Proper heading hierarchy
- High contrast text
- Keyboard navigation support
- Reduced motion support
- Screen reader friendly

## Future Enhancements

- [ ] Implement livestream functionality
- [ ] Add bilingual support (English/Spanish)
- [ ] Enhance RSVP system
- [ ] Add photo gallery
- [ ] Implement guest book feature

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.

# Highlights
1. Slick and fully __responsive__ design.
2. __RSVP feature__ which directly uploads data to a Google sheet.
3. __Receive email alerts__ when someone RSVPs.
4. __Add to Calendar__ feature which supports four different calendars.
