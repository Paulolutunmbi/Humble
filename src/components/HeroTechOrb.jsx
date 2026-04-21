import { useEffect, useRef, useState } from 'react'

const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function HeroTechOrb() {
  const canvasRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY)
    const motionMedia = window.matchMedia(REDUCED_MOTION_QUERY)

    const syncPreferences = () => {
      setIsDesktop(desktopMedia.matches)
      setPrefersReducedMotion(motionMedia.matches)
    }

    syncPreferences()
    desktopMedia.addEventListener('change', syncPreferences)
    motionMedia.addEventListener('change', syncPreferences)

    return () => {
      desktopMedia.removeEventListener('change', syncPreferences)
      motionMedia.removeEventListener('change', syncPreferences)
    }
  }, [])

  const shouldRenderScene = isDesktop

  useEffect(() => {
    if (!shouldRenderScene || !canvasRef.current) return
    let disposeScene = () => {}
    let isCancelled = false

    const initScene = async () => {
      const THREE = await import('three')
      if (isCancelled || !canvasRef.current) return

      const canvas = canvasRef.current
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power'
      })

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setClearColor(0x000000, 0)

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20)
      camera.position.set(0, 0.15, 4.2)

      const ambient = new THREE.AmbientLight(0xffffff, 0.65)
      const keyLight = new THREE.DirectionalLight(0xb6bcc8, 0.68)
      keyLight.position.set(3.5, 2, 3)

      const fillLight = new THREE.PointLight(0x10b981, 0.8, 12)
      fillLight.position.set(-2.4, -1.8, 2)

      scene.add(ambient, keyLight, fillLight)

      const objectGroup = new THREE.Group()
      scene.add(objectGroup)

      const coreGeometry = new THREE.IcosahedronGeometry(1.05, 1)
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        metalness: 0.25,
        roughness: 0.32,
        flatShading: true,
        emissive: 0x064e3b,
        emissiveIntensity: 0.45
      })
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)

      const shellGeometry = new THREE.IcosahedronGeometry(1.4, 0)
      const shellMaterial = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      })
      const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial)

      const orbitGeometry = new THREE.TorusGeometry(1.8, 0.03, 10, 120)
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.4
      })
      const orbitRing = new THREE.Mesh(orbitGeometry, orbitMaterial)
      orbitRing.rotation.x = Math.PI / 2.7

      const orbitRingSecondaryMaterial = orbitMaterial.clone()
      const orbitRingSecondary = new THREE.Mesh(orbitGeometry, orbitRingSecondaryMaterial)
      orbitRingSecondary.rotation.y = Math.PI / 2.4

      objectGroup.add(coreMesh, shellMesh, orbitRing, orbitRingSecondary)

      const resize = () => {
        if (!canvas.parentElement) return
        const { width, height } = canvas.parentElement.getBoundingClientRect()
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      resize()
      window.addEventListener('resize', resize)

      let inViewport = true
      let tabIsVisible = document.visibilityState === 'visible'

      const observer = new IntersectionObserver(
        ([entry]) => {
          inViewport = entry.isIntersecting
        },
        { threshold: 0.15 }
      )
      observer.observe(canvas)

      const onVisibilityChange = () => {
        tabIsVisible = document.visibilityState === 'visible'
      }
      document.addEventListener('visibilitychange', onVisibilityChange)

      const timer = new THREE.Timer()
      let frameId = 0

      if (prefersReducedMotion) {
        objectGroup.rotation.y = 0.35
        objectGroup.rotation.x = 0.08
        shellMesh.rotation.y = -0.25
        orbitRing.rotation.z = 0.4
        orbitRingSecondary.rotation.x = -0.28
        renderer.render(scene, camera)
      } else {
        const animate = () => {
          frameId = window.requestAnimationFrame(animate)

          if (!inViewport || !tabIsVisible) return

          timer.update()
          const elapsed = timer.getElapsed()
          objectGroup.rotation.y = elapsed * 0.24
          objectGroup.rotation.x = Math.sin(elapsed * 0.45) * 0.14

          shellMesh.rotation.y = -elapsed * 0.3
          orbitRing.rotation.z = elapsed * 0.42
          orbitRingSecondary.rotation.x = -elapsed * 0.36

          renderer.render(scene, camera)
        }

        animate()
      }

      disposeScene = () => {
        window.cancelAnimationFrame(frameId)
        window.removeEventListener('resize', resize)
        document.removeEventListener('visibilitychange', onVisibilityChange)
        observer.disconnect()

        coreGeometry.dispose()
        shellGeometry.dispose()
        orbitGeometry.dispose()
        coreMaterial.dispose()
        shellMaterial.dispose()
        orbitMaterial.dispose()
        orbitRingSecondaryMaterial.dispose()
        renderer.dispose()
        scene.clear()
      }
    }

    initScene()

    return () => {
      isCancelled = true
      disposeScene()
    }
  }, [shouldRenderScene, prefersReducedMotion])

  if (!shouldRenderScene) return null

  return (
    <div className="hero-tech-canvas-wrap" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-tech-canvas" />
    </div>
  )
}
