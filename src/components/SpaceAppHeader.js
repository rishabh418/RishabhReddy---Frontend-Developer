import React,{useState,useEffect} from 'react'
import './SpaceAppHeader.css'
import background from "../images/Space.png";

const SpaceAppHeader = () => {
    return (
      <div>
        <h1 style={{ color: 'black', textAlign: 'center' }}>Space X Capsules Application</h1>
        <section>
          <img src={background} alt="no-image" width="50%" height="350px" />
          <article className='App-article'>
            <h2 style={{ color: 'black', textAlign: 'center' }}>We are the light that travels into space.</h2>
            <p style={{ textAlign: 'center' }}>
              A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Capsules are distinguished from other satellites primarily by the ability to survive reentry and return a payload to the Earth's surface from orbit. Capsule-based crewed spacecraft such as Soyuz or Orion are often supported by a service or adapter module, and sometimes augmented with an extra module for extended space operations. Capsules make up the majority of crewed spacecraft designs, although one crewed spaceplane, the Space Shuttle, has flown in orbit.
            </p>
          </article>
        </section>
      </div>
    );
  }

  export default React.memo(SpaceAppHeader)