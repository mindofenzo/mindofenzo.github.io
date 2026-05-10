/** --- SYSTEM SETUP --- */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const uiLayer = document.getElementById('ui-layer');
const levelSelectLayer = document.getElementById('level-select-layer');
const pauseLayer = document.getElementById('pause-layer');
const pauseBtn = document.getElementById('pause-btn');
const toggleBtn = document.getElementById('toddler-toggle');
const checkIcon = document.getElementById('mode-check');
const hud = document.getElementById('hud');
const progressBar = document.getElementById('progress-bar');
const levelText = document.getElementById('level-text');

let width, height;
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let toddlerMode = true;
toggleBtn.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    toddlerMode = !toddlerMode;
    if(toddlerMode) checkIcon.classList.add('checked');
    else checkIcon.classList.remove('checked');
});

/** --- SFX SYSTEM --- */
let audioCtx = null;
function initSFX() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, type, duration, vol=0.1) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
}

function playJumpSound() { playTone(554.37, 'sine', 0.3, 0.15); }
function playSmashSound() { 
    playTone(300, 'square', 0.2, 0.1); playTone(400, 'sawtooth', 0.3, 0.1); 
}
function playCrashSound() { 
    playTone(150, 'sawtooth', 0.5, 0.2); playTone(100, 'square', 0.5, 0.2); 
}

/** --- BACKGROUND MUSIC MANAGER & PROGRESSION --- */
let currentMusic = null;

function nextLevel() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    playThemeMusic(themes[currentThemeIndex].audioId);
    updateUI();
    gameSpeed += 0.5;
}

function playThemeMusic(audioId) {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.onended = null; 
        currentMusic.currentTime = 0;
    }
    const nextTrack = document.getElementById(audioId);
    if (nextTrack) {
        currentMusic = nextTrack;
        currentMusic.volume = 0.6; 
        currentMusic.onended = nextLevel; 
        let playPromise = currentMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => console.error("Audio blocked, check filenames/permissions: " + e));
        }
    } else {
        console.error("Could not find audio element: " + audioId);
    }
}

/** --- GAME STATE MANAGERS --- */
function pauseGame() {
    gameState = 'paused';
    pauseLayer.style.display = 'flex';
    pauseBtn.style.display = 'none';
    if (currentMusic) currentMusic.pause();
}

function resumeGame() {
    gameState = 'playing';
    pauseLayer.style.display = 'none';
    pauseBtn.style.display = 'flex';
    if (currentMusic) currentMusic.play();
}

function goHome() {
    gameState = 'levelSelect';
    pauseLayer.style.display = 'none';
    hud.style.opacity = '0';
    pauseBtn.style.display = 'none';
    levelSelectLayer.style.display = 'flex';
    if (currentMusic) { currentMusic.pause(); currentMusic.currentTime = 0; }
}

/** --- UI EVENT LISTENERS --- */
document.getElementById('level-cameron').addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    levelSelectLayer.style.display = 'none';
    hud.style.opacity = '1';
    pauseBtn.style.display = 'flex';
    gameState = 'playing';
    resetGame(); 
});

// New Back Button functionality
document.getElementById('btn-back-start').addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    levelSelectLayer.style.display = 'none';
    uiLayer.style.display = 'flex';
    gameState = 'start';
});

pauseBtn.addEventListener('pointerdown', (e) => { e.stopPropagation(); pauseGame(); });
document.getElementById('btn-resume').addEventListener('pointerdown', (e) => { e.stopPropagation(); resumeGame(); });
document.getElementById('btn-restart').addEventListener('pointerdown', (e) => { e.stopPropagation(); resetGame(); resumeGame(); });
document.getElementById('btn-home').addEventListener('pointerdown', (e) => { e.stopPropagation(); goHome(); });

/** --- MAIN INPUT & JUMP LISTENER --- */
let isPointerDown = false; // Tracks if screen is being held

window.addEventListener('pointerdown', (e) => {
    // Ignore UI clicks
    if(e.target.closest('#toddler-toggle') || e.target.closest('.level-card') || 
       e.target.closest('#pause-btn') || e.target.closest('.pause-menu-card') ||
       e.target.closest('#btn-back-start')) {
        return;
    }

    isPointerDown = true;

    if (gameState === 'start') {
        initSFX();
        // Robust audio unlock for mobile: Play then immediately pause
        themes.forEach(t => {
            let audioTag = document.getElementById(t.audioId);
            if(audioTag) {
                audioTag.play().then(() => {
                    audioTag.pause();
                    audioTag.currentTime = 0;
                }).catch(err => {}); // Silently catch initialization blocks
            }
        });

        uiLayer.style.display = 'none';
        levelSelectLayer.style.display = 'flex';
        gameState = 'levelSelect';
    } else if (gameState === 'playing') {
        // Double Jump Logic (Requires a distinct tap)
        if (player.jumpCount < player.maxJumps) {
            player.vy = jumpForce;
            player.isGrounded = false;
            player.jumpCount++;
            playJumpSound();
            spawnParticles(player.x, player.y + player.size, 10, '#ffffff', 0.5);
        }
    } else if (gameState === 'dead') {
        resetGame();
        gameState = 'playing';
    }
});

// Reset pointer hold state when letting go
window.addEventListener('pointerup', () => isPointerDown = false);
window.addEventListener('pointercancel', () => isPointerDown = false);

/** --- GAME VARIABLES --- */
let gameState = 'start'; 
let frameCount = 0;
let gameSpeed = 8;
let bgHue = 0;
let bgPulse = 0;
let cameraX = 0;
let currentThemeIndex = 0;

const gravity = 0.8;
const jumpForce = -14;
const groundHeight = 100;

const player = { 
    x: 150, y: 0, size: 40, vy: 0, rotation: 0, isGrounded: false, 
    color: '#00ffcc', trail: [], jumpCount: 0, maxJumps: 2 
};

let obstacles = [];
let particles = [];
let bgProps = [];
let bgEnvParticles = [];

for(let i=0; i<40; i++) {
    bgEnvParticles.push({
        x: Math.random() * width, y: Math.random() * height,
        size: Math.random() * 3 + 1, speed: Math.random() * 2 + 0.5
    });
}

function spawnBgProp() {
    const theme = themes[currentThemeIndex];
    const artChoices = theme.art;
    const chosenArt = artChoices[Math.floor(Math.random() * artChoices.length)];

    bgProps.push({
        x: width + 100, y: (Math.random() * (height - groundHeight - 150)) + 50,
        type: chosenArt, scale: Math.random() * 3 + 4, speed: Math.random() * 2 + 1,
        frame: 0, tick: 0, animSpeed: Math.floor(Math.random() * 15) + 15
    });
}

/** --- GAME LOGIC --- */
function resetGame() {
    player.y = height - groundHeight - player.size;
    player.vy = 0; player.rotation = 0; player.trail = [];
    player.jumpCount = 0; // Reset jumps on fresh start
    obstacles = []; particles = []; bgProps = []; cameraX = 0;
    gameSpeed = 8 + (width / 200);
    
    currentThemeIndex = 0; 
    bgHue = themes[currentThemeIndex].hueOffset;
    playThemeMusic(themes[currentThemeIndex].audioId);
    updateUI();
}

function updateUI() {
    const theme = themes[currentThemeIndex];
    progressBar.style.backgroundColor = theme.color;
    levelText.innerText = theme.name;
    player.color = theme.color;
    
    levelText.style.opacity = '1';
    setTimeout(() => { if(gameState === 'playing') levelText.style.opacity = '0'; }, 2000);
}

function spawnParticles(x, y, count, color, speedScale = 1) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 20 * speedScale,
            vy: (Math.random() - 0.5) * 20 * speedScale - 2,
            size: Math.random() * 12 + 5,
            color: color, life: 1.0, decay: Math.random() * 0.02 + 0.02
        });
    }
}

function spawnObstacle() {
    const startX = width + 100;
    const type = Math.random() > 0.5 ? 'spike' : 'block';
    obstacles.push({
        type: type, x: startX,
        y: type === 'spike' ? height - groundHeight : height - groundHeight - 40,
        width: 40, height: 40, color: type === 'spike' ? '#ff0055' : '#ffaa00'
    });
}

/** --- UPDATE LOOP --- */
function update() {
    if (gameState === 'playing') {
        if(frameCount % 30 === 0) bgPulse = 1.0; 
        bgPulse *= 0.9;

        // Failsafe music progress checking
        if (currentMusic && !isNaN(currentMusic.duration) && currentMusic.duration > 0) {
            let progressPct = (currentMusic.currentTime / currentMusic.duration) * 100;
            progressBar.style.width = progressPct + '%';
            
            // Backup check in case the onended event fails to fire
            if (currentMusic.currentTime >= currentMusic.duration - 0.2 && currentMusic.duration > 1) {
                nextLevel();
            }
        }

        player.vy += gravity;
        player.y += player.vy;
        if (!player.isGrounded) player.rotation += 6; 

        // Floor Collision & Auto-Hop Logic
        if (player.y + player.size >= height - groundHeight) {
            player.y = height - groundHeight - player.size;
            player.vy = 0;
            if (!player.isGrounded) {
                player.isGrounded = true;
                player.rotation = Math.round(player.rotation / 90) * 90;
                player.jumpCount = 0; // Reset double jump on landing
                
                // Hold-to-Jump logic
                if (isPointerDown) {
                    player.vy = jumpForce;
                    player.isGrounded = false;
                    player.jumpCount = 1; // Used 1 jump
                    playJumpSound();
                    spawnParticles(player.x, player.y + player.size, 10, '#ffffff', 0.5);
                }
            }
        } else { player.isGrounded = false; }

        if (frameCount % 2 === 0) player.trail.push({ x: player.x, y: player.y, rotation: player.rotation, life: 1.0 });
        player.trail.forEach(t => t.life -= 0.05);
        player.trail = player.trail.filter(t => t.life > 0);

        if (frameCount % Math.floor(60 - (gameSpeed*1.5)) === 0) spawnObstacle();
        if (frameCount % 70 === 0 && Math.random() > 0.3) spawnBgProp();

        for (let i = bgProps.length - 1; i >= 0; i--) {
            let prop = bgProps[i];
            prop.x -= prop.speed;
            prop.tick++;
            if (prop.tick >= prop.animSpeed) {
                prop.tick = 0;
                const frames = artLibrary[prop.type];
                prop.frame = (prop.frame + 1) % frames.length; 
            }
            if (prop.x < -200) bgProps.splice(i, 1);
        }

        const themeEffect = themes[currentThemeIndex].effect;
        bgEnvParticles.forEach(p => {
            if (themeEffect === 'snow') {
                p.y += p.speed * 1.5; p.x -= p.speed * 0.5;
                if (p.y > height) p.y = 0; if (p.x < 0) p.x = width;
            } else if (themeEffect === 'stars') {
                p.x -= p.speed * (gameSpeed / 2); if (p.x < 0) p.x = width;
            } else if (themeEffect === 'embers') {
                p.y -= p.speed; p.x -= p.speed * 0.5; if (p.y < 0) p.y = height;
            } else {
                p.x -= p.speed * (gameSpeed / 5); if (p.x < -10) p.x = width + 10;
            }
        });

        for (let i = obstacles.length - 1; i >= 0; i--) {
            let obs = obstacles[i];
            obs.x -= gameSpeed;

            let pBox = { x: player.x + 5, y: player.y + 5, w: player.size - 10, h: player.size - 10 };
            let oBox = { 
                x: obs.type === 'spike' ? obs.x + 10 : obs.x, 
                y: obs.type === 'spike' ? obs.y - obs.height + 10 : obs.y, 
                w: obs.type === 'spike' ? obs.width - 20 : obs.width, 
                h: obs.type === 'spike' ? obs.height - 10 : obs.height 
            };

            if (pBox.x < oBox.x + oBox.w && pBox.x + pBox.w > oBox.x && pBox.y < oBox.y + oBox.h && pBox.y + pBox.h > oBox.y) {
                if (toddlerMode) {
                    playSmashSound();
                    spawnParticles(obs.x + obs.width/2, obs.y + obs.height/2, 40, obs.color, 1.5);
                    obstacles.splice(i, 1); cameraX = 10; 
                    player.vy = -6; player.isGrounded = false;
                    player.jumpCount = 1; // Give a jump back after smashing!
                } else {
                    gameState = 'dead'; playCrashSound();
                    spawnParticles(player.x + player.size/2, player.y + player.size/2, 50, player.color, 2);
                    spawnParticles(obs.x + obs.width/2, obs.y + obs.height/2, 30, obs.color, 1.5);
                    cameraX = 20; 
                }
            } else if (obs.x + obs.width < 0) { obstacles.splice(i, 1); }
        }
        cameraX *= -0.8;
        if (Math.abs(cameraX) < 1) cameraX = 0;

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.vy += gravity * 0.5; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
            if (p.life <= 0) particles.splice(i, 1);
        }
        frameCount++;
        
    } else if (gameState === 'dead') {
        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.vy += gravity * 0.5; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
            if (p.life <= 0) particles.splice(i, 1);
        }
        cameraX *= -0.8;
        if (Math.abs(cameraX) < 1) cameraX = 0;
        
        if (particles.length === 0) {
            resetGame();
            gameState = 'playing';
        }
    }
}

/** --- DRAW LOOP --- */
function drawPixelArt(ctx, frameData, startX, startY, pixelSize) {
    for (let r = 0; r < frameData.length; r++) {
        for (let c = 0; c < frameData[r].length; c++) {
            if (pixelColors[frameData[r][c]]) {
                ctx.fillStyle = pixelColors[frameData[r][c]];
                ctx.fillRect(startX + (c * pixelSize), startY + (r * pixelSize), pixelSize, pixelSize);
            }
        }
    }
}

function draw() {
    if (gameState !== 'start' && gameState !== 'levelSelect') {
        const theme = themes[currentThemeIndex];
        bgHue += (theme.hueOffset - bgHue) * 0.05; 
    }
    
    const lightness = 8 + (bgPulse * 15);
    ctx.fillStyle = `hsl(${bgHue}, 50%, ${lightness}%)`;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(cameraX, 0);

    const currentTheme = themes[currentThemeIndex];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    if(currentTheme && currentTheme.effect === 'embers') ctx.fillStyle = 'rgba(255, 100, 0, 0.6)';
    bgEnvParticles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    });

    bgProps.forEach(prop => {
        ctx.globalAlpha = 0.5;
        const frames = artLibrary[prop.type];
        const currentFrameData = frames[prop.frame];
        drawPixelArt(ctx, currentFrameData, prop.x, prop.y, prop.scale);
    });
    ctx.globalAlpha = 1.0;

    const groundY = height - groundHeight;
    ctx.fillStyle = '#05050a';
    ctx.fillRect(0, groundY, width, groundHeight);
    
    if (currentTheme) {
        ctx.shadowBlur = 20; ctx.shadowColor = currentTheme.color; ctx.strokeStyle = currentTheme.color;
        ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, groundY); ctx.lineTo(width, groundY); ctx.stroke();
        ctx.shadowBlur = 0; 
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; ctx.lineWidth = 3;
    const gridOffset = (frameCount * gameSpeed) % 60;
    for (let i = -gridOffset; i < width; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, groundY); ctx.lineTo(i - 30, height); ctx.stroke();
    }

    obstacles.forEach(obs => {
        ctx.shadowBlur = 15; ctx.shadowColor = obs.color; ctx.fillStyle = obs.color;
        if (obs.type === 'spike') {
            ctx.beginPath(); ctx.moveTo(obs.x + obs.width / 2, obs.y - obs.height); 
            ctx.lineTo(obs.x + obs.width, obs.y); ctx.lineTo(obs.x, obs.y); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.shadowBlur = 0; ctx.beginPath();
            ctx.moveTo(obs.x + obs.width / 2, obs.y - obs.height + 10);
            ctx.lineTo(obs.x + obs.width - 8, obs.y - 4); ctx.lineTo(obs.x + 8, obs.y - 4); ctx.closePath(); ctx.fill();
        } else {
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(obs.x+5, obs.y+5, obs.width-10, obs.height-10);
        }
    });

    if (gameState !== 'dead' && gameState !== 'start' && gameState !== 'levelSelect') {
        player.trail.forEach(t => {
            ctx.save(); ctx.translate(t.x + player.size / 2, t.y + player.size / 2);
            ctx.rotate(t.rotation * Math.PI / 180); ctx.fillStyle = player.color;
            ctx.globalAlpha = t.life * 0.4; ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
            ctx.restore();
        });
        ctx.globalAlpha = 1.0;

        ctx.save(); ctx.translate(player.x + player.size / 2, player.y + player.size / 2);
        ctx.rotate(player.rotation * Math.PI / 180);
        ctx.shadowBlur = 20; ctx.shadowColor = player.color; ctx.fillStyle = player.color;
        ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
        ctx.fillStyle = '#ffffff'; ctx.shadowBlur = 0;
        ctx.fillRect(-player.size / 4, -player.size / 4, player.size / 2, player.size / 2);
        ctx.restore();
    }

    particles.forEach(p => {
        ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color;
        ctx.shadowBlur = 10; ctx.shadowColor = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    ctx.globalAlpha = 1.0; ctx.shadowBlur = 0; ctx.restore();
}

function loop() { update(); draw(); requestAnimationFrame(loop); }
loop();
