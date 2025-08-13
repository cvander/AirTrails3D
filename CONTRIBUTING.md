# Contributing to AirTrails3D

Thank you for your interest in contributing to AirTrails3D! 🌍✈️

## Ways to Contribute

### 1. **Add New Travel Routes**
- Create new character route files in `/public/js/data/`
- Follow the existing JSON format
- Use valid IATA airport codes
- Add corresponding HTML pages

### 2. **Enhance Visualizations**
- Improve 3D globe rendering
- Add new animation effects
- Optimize performance
- Add visual themes

### 3. **Improve Documentation**
- Fix typos or unclear instructions
- Add examples and tutorials
- Translate to other languages

### 4. **Fix Bugs**
- Report issues with clear reproduction steps
- Submit fixes with test cases

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AirTrails3D.git
   cd AirTrails3D
   ```

3. **Test locally:**
   ```bash
   node server.js
   # Visit http://localhost:5050/john-doe or http://localhost:5050/rosalia
   ```

4. **Make your changes**
5. **Test thoroughly**
6. **Submit a pull request**

## Code Guidelines

- **Zero dependencies** - Keep it dependency-free
- **Clean code** - Use clear variable names and comments
- **Test your changes** - Ensure both routes work properly
- **Follow existing patterns** - Match the current code style

## Adding New Characters

1. **Create route data:** `/public/js/data/character-name-routes.json`
2. **Create HTML page:** `/public/pages/character-name.html`  
3. **Add route mapping:** Update `ROUTES` in `server.js`
4. **Configure camera:** Add camera positioning in `globe.js`

## Questions?

Feel free to open an issue for:
- Feature requests
- Bug reports  
- Questions about implementation
- Ideas for improvements

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Happy coding!** 🚀