import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from 'react';

export const Partenaires = ({
    
  }) => {
    

  
    return(
    <>
    <div>
  
  <p className="flex-grow-0 flex-shrink-0  text-sm font-medium text-left text-_gris mb-4 mx-8">
    Kit le nid vous propose un ensemble d’offres avantageuses pour mieux répondre à vos besoins
    lors de vos études.
  </p>
  <div className="flex-grow-0 flex-shrink-0  h-_153 relative mx-8">
    <div className="w-full h-36 absolute -left-1 -top-1 rounded-xl  border border-_bordureBleu" />
    <p className=" absolute left-36 top-11 text-xs font-medium text-left text-_gris">
      Heyme vous offre l’accès à une mutuelle santé à prix réduit.
    </p>
    <p className="  absolute left-36 top-4 text-lg font-bold text-left text-_aPropos">
      Mutuelle santé
    </p>
    <img
      src="/static/img/heyme.svg"
      className="w-28 h-28 absolute left-4 top-4 rounded-xl object-none border border-_bordureBleu"
    />
    <a
      className="flex justify-center items-center absolute left-36 top-20 gap-2.5 px-10 py-3 rounded-xl"
      style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
      href="https://heyme.care/fr"
    >
      <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white cursor-pointer" >
        Découvrir Heyme
      </p>
    </a>
  </div>
  <div className="flex-grow-0 flex-shrink-0  h-36 relative mb-4 mx-8">
    <div className="w-full h-36 absolute -left-1 -top-1 rounded-xl bg-white border border-_bordureBleu " />
    <p className=" absolute left-36 top-11 text-xs font-medium text-left text-_gris">
      Cautioneo vous offre un garant solide pour votre location.
    </p>
    <p className=" absolute left-36 top-4 text-lg font-bold text-left text-_aPropos">
      Mutuelle santé
    </p>
    <img
      src="/static/img/cautioneo.svg"
      className="w-28 h-28 absolute left-4 top-4 rounded-xl object-none border border-_bordureBleu"
    />
    <a
      className="flex justify-center items-center w-_189 absolute left-36 top-20 gap-2.5 px-10 py-3 rounded-xl"
      style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}
      href="https://www.cautioneo.com/"
    >
      <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
        Découvrir Cautioneo
      </p>
    </a>
  </div>

  <div className="flex-grow-0 flex-shrink-0 h-36 relative mx-8" >
    <div className="w-full h-36 absolute -left-1 -top-1 rounded-xl bg-white border border-_bordureBleu" />
    <p className=" absolute left-36 top-11 text-xs font-medium text-left text-_gris">
      Studéa vous offre accès à des résidences étudiantes.
    </p>
    <p className="w-_189 absolute left-36 top-4 text-lg font-bold text-left text-_aPropos">
      studea
    </p>
    <img
      src="/static/img/studea.svg"
      className="w-28 h-28 absolute left-4 top-4 rounded-xl object-none border border-_bordureBleu"
    />
    <div className="w-28 h-28 absolute left-4 top-4 rounded-xl border border-_bordureBleu" />
    <div
      className="flex justify-center items-center absolute left-36 top-20 gap-2.5 px-10 py-3 rounded-xl"
      style={{ background: "linear-gradient(to bottom, #81a3f9 -0.06%, #3462d8 108.09%)" }}>
        <Link href={"/dashboard/search/location"}>
      <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-left text-white">
        Découvrir Studéa
      </p></Link>
    </div>
  </div>
</div>
    </>
  )};


