document.addEventListener('DOMContentLoaded', () => {
    // Initialize intro screen
    initIntroScreen();
    
    // Create floating leaves background
    createFloatingLeaves();
    
    // Add hover effects and interactions
    addInteractions();
    
    // Initialize music player
    initMusicPlayer();
    
    // Initialize tablet effects
    initializeTabletEffects();
    
    // Initialize Minecraft lantern
    initializeMinecraftLantern();
    
    // Initialize particle effects
    initializeParticles();
    
    // Initialize Minecraft tree with falling leaves
    initializeMinecraftTree();
    
    // Initialize Lanyard API for Discord status
    initLanyardStatus();
});

function initIntroScreen() {
    const introScreen = document.getElementById('intro-screen');
    const introDoor = document.getElementById('intro-door');
    if (!introScreen || !introDoor) return;
    
    // Make sure clicks on the background don't dismiss the intro
    introScreen.addEventListener('click', (e) => {
        // Prevent clicks on the background from closing the intro
        if (e.target === introScreen) {
            e.stopPropagation();
        }
    });
    
    // Create audio element for early access
    const audio = document.createElement('audio');
    audio.src = 'music/background-music.mp3';
    audio.loop = true;
    audio.preload = 'auto';
    document.body.appendChild(audio);
    
    // Only make the door clickable to dismiss the intro
    introDoor.addEventListener('click', () => {
        // Add door opening sound effect
        const doorSound = new Audio('https://www.myinstants.com/media/sounds/minecraft_door_open.mp3');
        doorSound.volume = 0.5;
        doorSound.play();
        
        // Hide the intro screen when the door is clicked
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            
            // Start playing music automatically
            audio.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            
            // Update music player UI to show it's playing
            const musicPlayer = document.querySelector('.music-player');
            if (musicPlayer) {
                musicPlayer.innerHTML = '<i class="fas fa-pause"></i>';
                musicPlayer.classList.add('playing');
                window.isPlaying = true; // Set global state for music player
            }
        }, 500);
    });
}

function addInteractions() {
    // Character items hover effect
    const characterItems = document.querySelectorAll('.character-item');
    characterItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Project items hover effect
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const arrowIcon = item.querySelector('.arrow-icon');
            arrowIcon.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            const arrowIcon = item.querySelector('.arrow-icon');
            arrowIcon.style.transform = 'translateX(0)';
        });
    });
    
    // Link items hover effect
    const linkItems = document.querySelectorAll('.link-item');
    linkItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

function animateStatusIndicator() {
    const statusIndicator = document.querySelector('.status-indicator');
    
    // Random color changes for status indicator
    setInterval(() => {
        const hue = Math.floor(Math.random() * 60) + 280; // Purple-pink range
        statusIndicator.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
        statusIndicator.style.boxShadow = `0 0 10px hsl(${hue}, 70%, 60%)`;
    }, 3000);
}

function initMusicPlayer() {
    const musicPlayer = document.querySelector('.music-player');
    
    // Use the global isPlaying variable
    window.isPlaying = window.isPlaying || false;
    
    // Check if audio element already exists (created in initIntroScreen)
    let audio = document.querySelector('audio');
    
    // Create audio element if it doesn't exist yet
    if (!audio) {
        audio = document.createElement('audio');
        audio.src = './music/background-music.mp3';
        audio.loop = true;
        document.body.appendChild(audio);
    }
    
    // Toggle music on click
    musicPlayer.addEventListener('click', () => {
        if (window.isPlaying) {
            audio.pause();
            musicPlayer.innerHTML = '<i class="fas fa-music"></i>';
            musicPlayer.classList.remove('playing');
        } else {
            audio.play().catch(err => {
                console.log('Audio playback failed:', err);
            });
            musicPlayer.innerHTML = '<i class="fas fa-pause"></i>';
            musicPlayer.classList.add('playing');
        }
        window.isPlaying = !window.isPlaying;
    });
}

function initializeTabletEffects() {
    // Enhance cards with extra glow on hover
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
    
    // Enhance links with extra glow
    const links = document.querySelectorAll('.link-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateX(12px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateX(0)';
        });
    });
    
    // Add pulse effect to profile image on hover
    const profileImage = document.querySelector('.profile-image-container');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', () => {
            profileImage.style.transform = 'scale(1.1)';
        });
        
        profileImage.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'scale(1)';
        });
    }
}

function initializeMinecraftLantern() {
    const lantern = document.getElementById('minecraft-lantern');
    
    // Track light color state
    let colorState = 0; // 0=off, 1=orange, 2=blue, 3=green, 4=purple, 5=rainbow
    const colorNames = ['off', 'orange', 'blue', 'green', 'purple', 'rainbow'];
    const colorValues = [
        null, // off - no color
        { light: '#ffa200', dark: '#7a4e00', shadow: 'rgba(255, 162, 0, $alpha)' }, // orange
        { light: '#00a2ff', dark: '#004e7a', shadow: 'rgba(0, 162, 255, $alpha)' }, // blue
        { light: '#00ff66', dark: '#007a32', shadow: 'rgba(0, 255, 102, $alpha)' }, // green
        { light: '#a200ff', dark: '#4e007a', shadow: 'rgba(162, 0, 255, $alpha)' }, // purple
        { light: '#ff0000', dark: '#7a0000', shadow: 'rgba(255, 0, 0, $alpha)' }  // rainbow (starting with red)
    ];
    
    // Rainbow mode variables
    let rainbowInterval;
    let rainbowHue = 0;
    
    // Toggle lantern on click
    lantern.addEventListener('click', () => {
        // Cycle through colors: off -> orange -> blue -> green -> purple -> rainbow -> off
        colorState = (colorState + 1) % colorNames.length;
        
        // Update lantern class for styling
        lantern.className = 'minecraft-lantern'; // Reset classes
        
        // Clear any existing rainbow interval
        if (rainbowInterval) {
            clearInterval(rainbowInterval);
            rainbowInterval = null;
        }
        
        if (colorState > 0) {
            // Turn on the lantern with current color
            lantern.classList.add('on');
            lantern.classList.add(colorNames[colorState]);
            
            // Get current color values
            const color = colorValues[colorState];
            
            // Special handling for rainbow mode
            if (colorState === 5) { // Rainbow
                // Start the rainbow color cycling
                rainbowHue = 0;
                rainbowInterval = setInterval(() => {
                    rainbowHue = (rainbowHue + 5) % 360;
                    const rainbowColor = `hsl(${rainbowHue}, 100%, 50%)`;
                    const rainbowShadow = `hsla(${rainbowHue}, 100%, 50%, $alpha)`;
                    
                    // Update CSS variables with the current rainbow color
                    document.documentElement.style.setProperty('--accent-color', rainbowColor);
                    document.documentElement.style.setProperty('--accent-hover', rainbowColor);
                    document.documentElement.style.setProperty('--neon-glow', 
                        `0 0 8px ${rainbowShadow.replace('$alpha', '0.7')}, 
                        0 0 16px ${rainbowShadow.replace('$alpha', '0.5')}, 
                        0 0 24px ${rainbowShadow.replace('$alpha', '0.3')}`);
                    
                    // Update lantern glow color
                    lantern.style.filter = `brightness(1.5) drop-shadow(0 0 10px ${rainbowShadow.replace('$alpha', '0.8')})`;
                    
                    // Update cards with rainbow color
                    const cards = document.querySelectorAll('.card');
                    cards.forEach(card => {
                        card.style.boxShadow = `0 0 15px ${rainbowShadow.replace('$alpha', '0.7')}`;
                        card.style.borderColor = rainbowColor;
                    });
                    
                    // Create particles with rainbow colors occasionally
                    if (Math.random() < 0.1) {
                        const particleColor = {
                            light: rainbowColor,
                            shadow: rainbowShadow
                        };
                        createColoredParticles(particleColor, 3); // Create 3 particles at once
                    }
                    
                }, 100); // Update every 100ms for smooth transition
                
                // Play special rainbow sound - enhanced volume and effect
                const rainbowSound = new Audio('https://www.myinstants.com/media/sounds/minecraft-enchant.mp3');
                rainbowSound.volume = 0.5; // Increased volume
                rainbowSound.play().catch(err => console.log('Sound play failed:', err));
                
                // Add a complementary sound effect with slight delay for more impact
                setTimeout(() => {
                    const complementarySound = new Audio('https://www.myinstants.com/media/sounds/minecraft_levelup.mp3');
                    complementarySound.volume = 0.4;
                    complementarySound.play().catch(err => console.log('Sound play failed:', err));
                }, 300);
            } else {
                // Regular color updates for non-rainbow modes
                document.documentElement.style.setProperty('--accent-color', color.light);
                document.documentElement.style.setProperty('--accent-hover', color.light);
                document.documentElement.style.setProperty('--neon-glow', 
                    `0 0 8px ${color.shadow.replace('$alpha', '0.7')}, 
                    0 0 16px ${color.shadow.replace('$alpha', '0.5')}, 
                    0 0 24px ${color.shadow.replace('$alpha', '0.3')}`);
                
                // Update lantern light color
                const lanternLight = document.querySelector('.minecraft-lantern.on::after');
                if (lanternLight) {
                    lanternLight.style.background = `radial-gradient(
                        circle, 
                        ${color.shadow.replace('$alpha', '0.6')} 0%, 
                        ${color.shadow.replace('$alpha', '0.4')} 30%,
                        ${color.shadow.replace('$alpha', '0.2')} 60%,
                        ${color.shadow.replace('$alpha', '0')} 80%
                    )`;
                }
                
                // Add subtle warm tint to cards
                const cards = document.querySelectorAll('.card');
                cards.forEach(card => {
                    card.style.boxShadow = `0 0 15px ${color.shadow.replace('$alpha', '0.7')}`;
                    card.style.borderColor = color.light;
                });
                
                // Create ambient particles for the current color
                createColoredParticles(color);
            }
            
        } else {
            // Turn off the lantern
            // Restore default colors
            document.documentElement.style.setProperty('--accent-color', '#ffa200');
            document.documentElement.style.setProperty('--accent-hover', '#ffb733');
            document.documentElement.style.setProperty('--neon-glow', '0 0 8px rgba(255, 162, 0, 0.7), 0 0 16px rgba(255, 162, 0, 0.5), 0 0 24px rgba(255, 162, 0, 0.3)');
            
            // Reset card styling
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.style.boxShadow = 'var(--neon-glow)';
                card.style.borderColor = 'var(--accent-color)';
            });
        }
    });
    
    // Add subtle animation to lantern (not for rainbow mode - that's handled separately)
    setInterval(() => {
        if (colorState > 0 && colorState < 5) { // Only for regular colors, not rainbow
            const intensity = 1 + (Math.random() * 0.3); // 1.0-1.3 brightness
            const color = colorValues[colorState];
            lantern.style.filter = `brightness(${intensity}) drop-shadow(0 0 10px ${color.shadow.replace('$alpha', '0.8')})`;
        } else if (colorState === 0) {
            lantern.style.filter = 'brightness(1)';
        }
        // Rainbow mode filter is handled by its own interval
    }, 500);
}

function createColoredParticles(color, count = 10) {
    // Create particles at intervals
    const particleInterval = setInterval(() => {
        const lantern = document.getElementById('minecraft-lantern');
        
        // Stop creating particles if lantern is turned off
        if (!lantern.classList.contains('on')) {
            clearInterval(particleInterval);
            return;
        }
        
        // Create a particle
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position near lantern
        const lanternRect = lantern.getBoundingClientRect();
        const centerX = lanternRect.left + lanternRect.width / 2;
        const centerY = lanternRect.top + lanternRect.height / 2;
        
        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        
        // Random duration between 2 and 4 seconds
        const duration = Math.random() * 2 + 2;
        
        // Calculate movement direction away from lantern
        const moveX = Math.cos(angle) * (Math.random() * 100 + 50);
        const moveY = Math.sin(angle) * (Math.random() * 100 + 50);
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = (Math.random() * 0.3 + 0.3).toString();
        particle.style.setProperty('--x', `${moveX}px`);
        particle.style.setProperty('--y', `${moveY}px`);
        particle.style.setProperty('--duration', `${duration}s`);
        
        // Set particle color based on the current lantern color
        particle.style.backgroundColor = color.light;
        particle.style.boxShadow = `0 0 8px ${color.shadow.replace('$alpha', '0.7')}`;
        
        // Add particle to document
        document.body.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }, 300 / count); // Create particles faster when count is higher
    
    // Stop creating particles after 10 seconds if not manually turned off
    setTimeout(() => {
        clearInterval(particleInterval);
    }, 10000);
}

function initializeParticles() {
    // List of elements to add particle effects to
    const glowElements = document.querySelectorAll('h1, h2, .section-header i');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseover', createParticlesEffect);
        element.addEventListener('mousemove', createParticlesEffect);
    });
}

function createParticlesEffect(event) {
    // Add particles only occasionally (reduces particle density)
    if (Math.random() > 0.3) return;
    
    const element = event.target;
    const rect = element.getBoundingClientRect();
    
    // Create a particle
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Calculate random position offset from cursor
    const offsetX = Math.random() * 100 - 50; // -50 to 50px
    const offsetY = Math.random() * 100 - 50; // -50 to 50px
    
    // Random size between 2px and 5px
    const size = Math.random() * 3 + 2;
    
    // Random duration between 1 and 2 seconds
    const duration = Math.random() * 1 + 1;
    
    // Position particle at cursor location
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--x', `${offsetX}px`);
    particle.style.setProperty('--y', `${offsetY}px`);
    particle.style.setProperty('--duration', `${duration}s`);
    
    // Add particle to element
    element.appendChild(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

function initializeMinecraftTree() {
    const tree = document.querySelector('.minecraft-tree');
    const treeParticles = document.querySelector('.tree-particles');
    
    if (!tree || !treeParticles) return;
    
    // Start periodically creating leaves that fall from the tree
    setInterval(() => {
        createMinecraftLeaf(tree);
    }, Math.random() * 2000 + 1000); // Random interval between 1-3 seconds
}

// Function to create and animate Minecraft-style leaves
function createMinecraftLeaf(treeElement) {
    const leaf = document.createElement('div');
    leaf.classList.add('minecraft-tree-leaf');
    
    // Randomly add golden leaves (10% chance)
    if (Math.random() < 0.1) {
        leaf.classList.add('golden');
    }
    
    // Random starting position within the tree crown
    const leftOffset = (Math.random() * 80) - 40; // Between -40px and 40px from center
    const topOffset = Math.random() * 60; // Top portion of the tree
    
    leaf.style.left = `calc(50% + ${leftOffset}px)`;
    leaf.style.top = `${topOffset}px`;
    
    // Calculate random falling path
    const fallX = (Math.random() * 200) - 100; // Fall between -100px and 100px horizontally
    const fallY = Math.random() * 200 + 150; // Fall between 150-350px vertically
    const rotation = Math.random() * 720 - 360; // Rotate between -360 and 360 degrees
    
    // Set CSS variables for the animation
    leaf.style.setProperty('--fall-x', fallX);
    leaf.style.setProperty('--fall-y', fallY);
    leaf.style.setProperty('--rotation', rotation);
    
    // Add the leaf to the tree
    treeElement.appendChild(leaf);
    
    // Remove leaf after animation completes
    const animationDuration = leaf.classList.contains('golden') ? 5000 : 4000;
    setTimeout(() => {
        if (leaf && leaf.parentNode) {
            leaf.remove();
        }
    }, animationDuration);
}

function updateTreeDepth() {
    const tree = document.querySelector('.minecraft-tree');
    if (!tree) return;
    
    // Add randomized texture variations
    const trunkBrightness = 90 + Math.floor(Math.random() * 20);
    const leavesBrightness = 90 + Math.floor(Math.random() * 30);
    
    tree.style.setProperty('--trunk-brightness', `${trunkBrightness}%`);
    tree.style.setProperty('--leaves-brightness', `${leavesBrightness}%`);
}

// Lanyard API integration for Discord status
function initLanyardStatus() {
    // Replace with your Discord user ID
    const discordUserId = '1002927879539146803'; // Replace with your actual Discord ID
    
    // Status elements
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.getElementById('status-text');
    const activityContainer = document.getElementById('activity-container');
    const activityIcon = document.getElementById('activity-icon');
    const activityName = document.getElementById('activity-name');
    const activityState = document.getElementById('activity-state');
    
    // Fetch data from Lanyard API
    function fetchDiscordStatus() {
        fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    updateDiscordStatus(data.data);
                } else {
                    statusText.textContent = 'Could not fetch Discord status';
                }
            })
            .catch(error => {
                console.error('Error fetching Discord status:', error);
                statusText.textContent = 'Could not fetch Discord status';
            });
    }
    
    // Update the UI with Discord status
    function updateDiscordStatus(data) {
        // Update status indicator and text
        const status = data.discord_status;
        statusIndicator.className = 'status-indicator ' + status;
        
        let statusMessage = 'Offline';
        if (status === 'online') statusMessage = 'Online';
        if (status === 'idle') statusMessage = 'Idle';
        if (status === 'dnd') statusMessage = 'Do Not Disturb';
        
        statusText.textContent = statusMessage;
        
        // Check for activities
        if (data.activities && data.activities.length > 0) {
            // Display activity container
            activityContainer.style.display = 'flex';
            
            // Find custom status first, if exists
            const customStatus = data.activities.find(activity => activity.type === 4);
            const gameActivity = data.activities.find(activity => activity.type === 0);
            const codingActivity = data.activities.find(activity => 
                activity.name === 'Visual Studio Code' || 
                activity.name === 'Code' || 
                activity.name.includes('Coding'));
            
            // Choose which activity to display (prioritize games and coding over custom status)
            const activity = gameActivity || codingActivity || customStatus || data.activities[0];
            
            // Display activity name
            if (activity.type === 4) {
                activityName.textContent = 'Custom Status';
            } else {
                activityName.textContent = activity.name;
            }
            
            // Set activity state if available
            if (activity.state) {
                activityState.textContent = activity.state;
            } else if (activity.details) {
                activityState.textContent = activity.details;
            } else if (activity.type === 4 && activity.emoji && activity.emoji.name) {
                // For custom status with emoji
                activityState.textContent = activity.emoji.name + ' ' + (activity.state || '');
            } else if (activity.type === 0) {
                activityState.textContent = 'Playing';
            } else {
                activityState.textContent = '';
            }
            
            // Set activity icon if available
            if (activity.application_id && activity.assets && activity.assets.large_image) {
                // Game or application with proper assets
                const assetId = activity.assets.large_image;
                if (assetId.startsWith('mp:')) {
                    // External asset
                    const assetPath = assetId.replace('mp:', '');
                    activityIcon.src = `https://media.discordapp.net/${assetPath}`;
                } else {
                    // Discord CDN asset
                    activityIcon.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${assetId}.png`;
                }
                activityIcon.alt = activity.name;
                

            } else if (activity.type === 4 && activity.emoji) {
                // Custom status with emoji
                if (activity.emoji.id) {
                    // Custom emoji
                    activityIcon.src = `https://cdn.discordapp.com/emojis/${activity.emoji.id}.png`;
                } else {
                    // Unicode emoji - use a default icon
                    activityIcon.src = 'https://cdn.discordapp.com/emojis/1002927879539146803.png';
                }
                activityIcon.alt = 'Status';
            } else {
                // Default icon for other activities
                if (activity.name === 'Visual Studio Code' || activity.name === 'Code') {
                    activityIcon.src = 'https://code.visualstudio.com/assets/images/code-stable.png';
                    

                } else {
                    activityIcon.src = 'https://cdn.discordapp.com/attachments/1002927879539146803/1118547508633227374/discord-icon.png';
                }
                activityIcon.alt = 'Activity';
            }
        } else {
            // Hide activity container if no activities
            activityContainer.style.display = 'none';
        }
    }
    
    // Initial fetch
    fetchDiscordStatus();
    
    // Refresh every 30 seconds
    setInterval(fetchDiscordStatus, 30000);
}

// Function to create floating leaves
function createFloatingLeaves() {
    const leavesContainer = document.getElementById('leaves-container');
    if (!leavesContainer) return;
    
    const containerWidth = window.innerWidth;
    
    // Create initial leaves - increased for more visible effect
    for (let i = 0; i < 25; i++) {
        createLeaf(leavesContainer, containerWidth);
    }
    
    // Continue creating leaves at intervals - more frequently
    setInterval(() => {
        createLeaf(leavesContainer, containerWidth);
    }, 2000); // Every 2 seconds instead of 3
}

function createLeaf(container, maxWidth) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    
    // Add different leaf types for variety
    const leafTypes = ['leaf-type-1', 'leaf-type-2', 'leaf-type-3'];
    const randomLeafType = leafTypes[Math.floor(Math.random() * leafTypes.length)];
    leaf.classList.add(randomLeafType);
    
    // Add color variations for more realism
    const leafColors = ['leaf-autumn', 'leaf-green', 'leaf-golden'];
    const colorDistribution = Math.random();
    // 50% autumn, 30% green, 20% golden
    if (colorDistribution < 0.5) {
        leaf.classList.add('leaf-autumn');
    } else if (colorDistribution < 0.8) {
        leaf.classList.add('leaf-green');
    } else {
        leaf.classList.add('leaf-golden');
    }
    
    // Random size between 30px and 60px for varied leaves
    const size = Math.random() * 30 + 30;
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    
    // Starting opacity variation (0.5-0.9)
    const leafOpacity = Math.random() * 0.4 + 0.5;
    leaf.style.setProperty('--leaf-opacity', leafOpacity);
    
    // Starting scale variation (0.8-1.2)
    const scale = Math.random() * 0.4 + 0.8;
    leaf.style.setProperty('--scale', scale);
    
    // Random starting position
    const posX = Math.random() * maxWidth;
    leaf.style.left = `${posX}px`;
    leaf.style.top = '-50px';
    
    // Initial position and rotation values
    const translateXStart = Math.random() * 100 - 50; // -50 to 50
    leaf.style.setProperty('--translate-x-start', translateXStart);
    
    // Initial 3D rotations
    const rotateXStart = `${Math.random() * 180}deg`;
    const rotateYStart = `${Math.random() * 180}deg`;
    const rotateZStart = `${Math.random() * 360}deg`;
    leaf.style.setProperty('--rotate-x-start', rotateXStart);
    leaf.style.setProperty('--rotate-y-start', rotateYStart);
    leaf.style.setProperty('--rotate-z-start', rotateZStart);
    
    // Create a natural swaying pattern for horizontal movement
    // Each leaf will have 4 control points for horizontal sway
    const swayAmplitude = Math.random() * 150 + 50; // 50-200px sway
    
    // Generate random sway points
    leaf.style.setProperty('--sway-x1', Math.random() * swayAmplitude - swayAmplitude/2);
    leaf.style.setProperty('--sway-x2', Math.random() * swayAmplitude - swayAmplitude/2);
    leaf.style.setProperty('--sway-x3', Math.random() * swayAmplitude - swayAmplitude/2);
    leaf.style.setProperty('--sway-x4', Math.random() * swayAmplitude - swayAmplitude/2);
    
    // Generate random rotation changes for 3D spinning effect
    // X rotation (forward/backward tilt)
    leaf.style.setProperty('--rotate-x1', `${Math.random() * 180 - 90}deg`);
    leaf.style.setProperty('--rotate-x2', `${Math.random() * 180 - 90}deg`);
    leaf.style.setProperty('--rotate-x3', `${Math.random() * 180 - 90}deg`);
    leaf.style.setProperty('--rotate-x4', `${Math.random() * 180 - 90}deg`);
    
    // Y rotation (side-to-side flip)
    leaf.style.setProperty('--rotate-y1', `${Math.random() * 180 - 90}deg`);
    leaf.style.setProperty('--rotate-y2', `${Math.random() * 180 - 90}deg`);
    leaf.style.setProperty('--rotate-y3', `${Math.random() * 180 - 90}deg`);
    leaf.style.setProperty('--rotate-y4', `${Math.random() * 180 - 90}deg`);
    
    // Z rotation (spinning like a propeller)
    leaf.style.setProperty('--rotate-z1', `${Math.random() * 360}deg`);
    leaf.style.setProperty('--rotate-z2', `${Math.random() * 360}deg`);
    leaf.style.setProperty('--rotate-z3', `${Math.random() * 360}deg`);
    leaf.style.setProperty('--rotate-z4', `${Math.random() * 720}deg`); // More spin at the end
    
    // Random animation duration for varied falling speeds
    const duration = Math.random() * 15 + 15; // 15-30 seconds
    leaf.style.setProperty('--duration', `${duration}s`);
    
    // Random delay so they don't all start at once
    const delay = Math.random() * 10;
    leaf.style.animationDelay = `${delay}s`;
    
    container.appendChild(leaf);
    
    // Remove leaf after animation completes
    setTimeout(() => {
        if (leaf && leaf.parentNode) {
            leaf.remove();
        }
    }, (duration + delay) * 1000);
}
