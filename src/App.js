import React, {useState, useEffect} from 'react';
import './App.css';
import './styles.css';
import './vue.css';


export default function App() {

  const [inMove,setInMove] = useState(false);

  const [touchStartY , setTouchStartY] = useState(0);

  const [abas , setAbas] = useState(['HOME','ABOUT','PROJECTS']);

  const [offsets , setOffsets] = useState(4);

  const [activeSectionMenu , setActiveSectionMenu] = useState(0);

  var activeSection = 0;
  

  function calculateSectionOffsets() {
    let sections = document.getElementsByTagName("section");
    let length = sections.length;
    let aux = [];

    

    for (let i = 0; i < length; i++) {
      let sectionOffset = sections[i].offsetTop;
      
      aux.push(sectionOffset);

    }

    setOffsets(aux.length);
    

  }

  function menuSide(props){

    var menuBar = [];
    
    var cont = 0;

    if(activeSectionMenu == 0){

       menuBar.push(<span
          className= {activeSectionMenu == 0 ? "menu-point active" : "menu-point" } 
          onClick={() => scrollToSection(0)}
          key={abas[0]}
          style={{color: 'white'}}
        >{ abas[0] }</span>);

        menuBar.push(<span
          className= {activeSectionMenu == 1 ? "menu-point active" : "menu-point" } 
          onClick={() => scrollToSection(1)}
          key={abas[1]}
          style={{color: 'white'}}
        >{ abas[1] }</span>);

        menuBar.push(<span
          className= {activeSectionMenu == 2 ? "menu-point active" : "menu-point" } 
          onClick={() => scrollToSection(2)}
          key={abas[2]}
          style={{color: 'white'}}
        >{ abas[2] }</span>);

      menuBar.push(<span
        className= {activeSectionMenu == 3? "menu-point-contact active" : "menu-point-contact" } 
        onClick={() => scrollToSection(3)}
        key="CONTACT"
        style={{color: 'white'}}>CONTACT</span>);

      return menuBar;
      
    }else{


        menuBar.push(<span
          className= {activeSectionMenu == 0 ? "menu-point active" : "menu-point" } 
          onClick={() => scrollToSection(0)}
          key={abas[0]}
          style={{color: 'black'}}
        >{ abas[0] }</span>);

        menuBar.push(<span
          className= {activeSectionMenu == 1 ? "menu-point active" : "menu-point" } 
          onClick={() => scrollToSection(1)}
          key={abas[1]}
          style={{color: 'black'}}
        >{ abas[1] }</span>);

        menuBar.push(<span
          className= {activeSectionMenu == 2 ? "menu-point active" : "menu-point" } 
          onClick={() => scrollToSection(2)}
          key={abas[2]}
          style={{color: 'black'}}
        >{ abas[2] }</span>);

      menuBar.push(<span
        className= {activeSectionMenu === 3? "menu-point-contact active" : "menu-point-contact" } 
        onClick={() => scrollToSection(3)}
        key="CONTACT"
        style={{color: 'black', borderColor: 'black'}}>CONTACT</span>);

      return menuBar;
    }
  }

  function handleMouseWheel(e) {

    if (e.wheelDelta < 30 && inMove == false) {
      moveUp();
    } else if (e.wheelDelta > 30 && inMove == false) {
      moveDown();
    }

    e.preventDefault();
    return false;
  }

  function handleMouseWheelDOM(e) {
    if (e.detail > 0 && !inMove == false) {
      moveUp();
    } else if (e.detail < 0 && !inMove == false) {
      moveDown();
    }

    return false;
  }

  function moveDown() {
    setInMove(true);
    
    var mudar = activeSection - 1 < 0 ? offsets - 1 : activeSection - 1;
    
    activeSection = mudar;

    scrollToSection(mudar, true);
  }

  function moveUp() {
    setInMove(true);
    
    var mudar = activeSection + 1 > offsets - 1 ? 0 : activeSection + 1;

    activeSection = mudar;

    scrollToSection(mudar, true);
  }

  function scrollToSection(id, force = false) {
    if (inMove && !force) return false;
    
    activeSection = id;

    setActiveSectionMenu(id);

    setInMove(true);

    document.getElementsByTagName("section")[id].scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      setInMove(false);
    }, 400);
  }

  function touchStart(e) {
    e.preventDefault();

    setTouchStartY(e.touches[0].clientY);
  }

  function touchMove(e) {
    if (inMove) return false;
    e.preventDefault();

    const currentY = e.touches[0].clientY;

    if (touchStartY < currentY) {
      moveDown();
    } else {
      moveUp();
    }

    setTouchStartY(0);
    return false;
  }

  useEffect( () => {

    calculateSectionOffsets();

    window.addEventListener("DOMMouseScroll", handleMouseWheelDOM); // Mozilla Firefox
    window.addEventListener("mousewheel", handleMouseWheel, {
      passive: false
    }); // Other browsers

    window.addEventListener("touchstart", touchStart, { passive: false }); // mobile devices
    window.addEventListener("touchmove", touchMove, { passive: false }); // mobile devices

    return () => {
      window.removeEventListener("mousewheel", handleMouseWheel, {
        passive: false
      }); // Other browsers
      window.removeEventListener("DOMMouseScroll", handleMouseWheelDOM); // Mozilla Firefox
  
      window.removeEventListener("touchstart", touchStart); // mobile devices
      window.removeEventListener("touchmove", touchMove); // mobile devices
    };

  }, [])


  return (
    <div id="app">
      <section className="fullpage main">
        <h1>Software Developer.</h1>
        <p>
          by
          <a href="https://github.com/gabriel-rodriguess" target="_blank">Gabriel Rodrigues</a>
        </p>

      </section>
      <section className="fullpage white">
      <h1 style={{ color : "black"}}>About me</h1>
      </section>

      <section className="fullpage red">
        <h1>Projects</h1>
      </section>
      
      <section className="fullpage green">
        <h1>Contact</h1>

      </section>
      
      <div className="sections-menu">
        {menuSide()}
      </div>

    </div>
  );
}
