// Cursor Trail Effect
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  createHeartTrail(mouseX, mouseY)
})

function createHeartTrail(x, y) {
  const hearts = ["🫀", "💗", "🌹", "💖", "💕"]
  const heart = document.createElement("div")
  heart.className = "cursor-trail"
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
  heart.style.left = x - 10 + "px"
  heart.style.top = y - 10 + "px"

  document.body.appendChild(heart)

  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart)
    }
  }, 1000)
}

// Butterfly Click Events
const butterflies = document.querySelectorAll(".butterfly")
const popupOverlay = document.getElementById("popup-overlay")
const popupMessage = document.getElementById("popup-message")
const closeBtn = document.querySelector(".close-btn")
let heartFormationActive = false
const clickedButterflies = new Set()

// Hide the 11th butterfly initially
const eleventhButterfly = document.querySelector(".butterfly-11")
eleventhButterfly.style.display = "none"

butterflies.forEach((butterfly, index) => {
  butterfly.addEventListener("click", () => {
    const message = butterfly.getAttribute("data-message")
    showPopup(message)

    // Mark this butterfly as clicked (except the 11th one)
    if (index !== 10) {
      clickedButterflies.add(index)

      // Check if all first 10 butterflies have been clicked
      if (clickedButterflies.size === 10) {
        // Hide the subtitle
        const subtitle = document.querySelector(".subtitle")
        subtitle.style.transition = "opacity 1s ease-out"
        subtitle.style.opacity = "0"

        // Immediately arrange the 10 butterflies in heart formation
        setTimeout(() => {
          arrangeButterfliesInHeart()
        }, 1000) // Wait 1 second after the last popup
      }
    }

    // Special effect for 11th butterfly (index 10) - YOUR VICTORY
    if (index === 10 && !heartFormationActive) {
      setTimeout(() => {
        triggerVictoryEffect()
      }, 2000) // Wait 2 seconds after popup shows
    }

    // Add click animation
    butterfly.style.transform = "scale(1.5) rotate(360deg)"
    setTimeout(() => {
      butterfly.style.transform = ""
    }, 500)
  })
})

function arrangeButterfliesInHeart() {
  const container = document.querySelector(".container")
  container.classList.add("heart-formation")

  // Position first 10 butterflies in heart shape
  const heartPositions = [
    { top: "35%", left: "50%" }, // butterfly-1 - top center
    { top: "40%", left: "45%" }, // butterfly-2 - left curve top
    { top: "40%", left: "55%" }, // butterfly-3 - right curve top
    { top: "45%", left: "42%" }, // butterfly-4 - left curve
    { top: "45%", left: "58%" }, // butterfly-5 - right curve
    { top: "50%", left: "40%" }, // butterfly-6 - left side
    { top: "50%", left: "60%" }, // butterfly-7 - right side
    { top: "55%", left: "45%" }, // butterfly-8 - left bottom
    { top: "55%", left: "55%" }, // butterfly-9 - right bottom
    { top: "60%", left: "50%" }, // butterfly-10 - bottom point
  ]

  const butterflyElements = [
    ".butterfly-1",
    ".butterfly-2",
    ".butterfly-3",
    ".butterfly-4",
    ".butterfly-5",
    ".butterfly-6",
    ".butterfly-7",
    ".butterfly-8",
    ".butterfly-9",
    ".butterfly-10",
  ]

  butterflyElements.forEach((selector, index) => {
    const butterfly = document.querySelector(selector)
    if (butterfly && heartPositions[index]) {
      butterfly.style.position = "fixed"
      butterfly.style.top = heartPositions[index].top
      butterfly.style.left = heartPositions[index].left
      butterfly.style.transform = "translate(-50%, -50%)"
      butterfly.style.animation = "none"
      butterfly.style.transition = "all 2s ease-in-out"
    }
  })

  // After heart formation is complete, show the 11th butterfly in the center
  setTimeout(() => {
    showEleventhButterflyInCenter()
  }, 2500) // Wait for heart formation to complete
}

function showEleventhButterflyInCenter() {
  eleventhButterfly.style.display = "block"
  eleventhButterfly.style.position = "fixed"
  eleventhButterfly.style.top = "47.5%" // Center of the heart
  eleventhButterfly.style.left = "50%"
  eleventhButterfly.style.transform = "translate(-50%, -50%) scale(0.5)"
  eleventhButterfly.style.opacity = "0"
  eleventhButterfly.style.transition = "all 1.5s ease-in-out"
  eleventhButterfly.style.zIndex = "100"

  // Animate entrance with scaling and fading in
  setTimeout(() => {
    eleventhButterfly.style.opacity = "1"
    eleventhButterfly.style.transform = "translate(-50%, -50%) scale(1.2)"
  }, 100)

  // Add special pulsing effect to indicate it's the final one
  setTimeout(() => {
    eleventhButterfly.style.animation = "specialGlow 1.5s ease-in-out infinite alternate"
  }, 1500)
}

function triggerVictoryEffect() {
  heartFormationActive = true

  // Create massive confetti and hearts
  createMassiveConfetti()

  // Scale up the 11th butterfly for the final celebration
  setTimeout(() => {
    eleventhButterfly.style.transform = "translate(-50%, -50%) scale(1.8)"
    eleventhButterfly.style.animation = "specialGlow 0.8s ease-in-out infinite alternate"
  }, 500)
}

function showPopup(message) {
  popupMessage.textContent = message
  popupOverlay.classList.add("active")
}

function hidePopup() {
  popupOverlay.classList.remove("active")
}

closeBtn.addEventListener("click", hidePopup)
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    hidePopup()
  }
})

// Escape key to close popup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hidePopup()
  }
})

// Music Toggle
const musicToggle = document.getElementById("music-toggle")
const backgroundMusic = document.getElementById("background-music")
let isPlaying = false

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    backgroundMusic.pause()
    musicToggle.textContent = "🎵"
    musicToggle.classList.remove("playing")
  } else {
    backgroundMusic.play().catch((e) => {
      console.log("Audio play failed:", e)
    })
    musicToggle.textContent = "🎶"
    musicToggle.classList.add("playing")
  }
  isPlaying = !isPlaying
})

// Add sparkle effect on butterfly hover
butterflies.forEach((butterfly) => {
  butterfly.addEventListener("mouseenter", () => {
    createSparkles(butterfly)
  })
})

function createSparkles(element) {
  const rect = element.getBoundingClientRect()
  const sparkles = ["✨", "⭐", "💫", "🌟"]

  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div")
      sparkle.className = "cursor-trail"
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)]
      sparkle.style.left = rect.left + Math.random() * rect.width + "px"
      sparkle.style.top = rect.top + Math.random() * rect.height + "px"
      sparkle.style.fontSize = "20px"

      document.body.appendChild(sparkle)

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle)
        }
      }, 1000)
    }, i * 100)
  }
}

// Add celebration confetti effect
function createConfetti() {
  const confetti = ["🎉", "🎊", "✨", "🌟", "💖"]

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const piece = document.createElement("div")
      piece.className = "cursor-trail"
      piece.textContent = confetti[Math.floor(Math.random() * confetti.length)]
      piece.style.left = Math.random() * window.innerWidth + "px"
      piece.style.top = "-50px"
      piece.style.fontSize = "30px"
      piece.style.animation = "fall 3s linear forwards"

      document.body.appendChild(piece)

      setTimeout(() => {
        if (piece.parentNode) {
          piece.parentNode.removeChild(piece)
        }
      }, 3000)
    }, i * 100)
  }
}

// Trigger confetti on page load
window.addEventListener("load", () => {
  setTimeout(createConfetti, 1000)
})

// Add gentle floating animation to main heading
const mainHeading = document.querySelector(".main-heading")
let floatDirection = 1

setInterval(() => {
  const currentTransform = mainHeading.style.transform || "translateY(0px)"
  const currentY = Number.parseFloat(currentTransform.match(/translateY$$(-?\d+)px$$/) || [0, 0])[1]

  if (currentY >= 10) floatDirection = -1
  if (currentY <= -10) floatDirection = 1

  mainHeading.style.transform = `translateY(${currentY + floatDirection}px)`
}, 100)

// Function to create massive confetti
function createMassiveConfetti() {
  const confetti = ["🎉", "🎊", "✨", "🌟", "💖"]

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const piece = document.createElement("div")
      piece.className = "cursor-trail"
      piece.textContent = confetti[Math.floor(Math.random() * confetti.length)]
      piece.style.left = Math.random() * window.innerWidth + "px"
      piece.style.top = "-50px"
      piece.style.fontSize = "30px"
      piece.style.animation = "fall 5s linear forwards"

      document.body.appendChild(piece)

      setTimeout(() => {
        if (piece.parentNode) {
          piece.parentNode.removeChild(piece)
        }
      }, 5000)
    }, i * 50)
  }
}
