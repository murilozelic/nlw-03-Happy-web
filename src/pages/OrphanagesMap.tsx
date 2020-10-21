import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/pages/Orphanages-map.css';
import CreateOrphanage from './CreateOrphanage';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      console.log(response.data)
      setOrphanages(response.data);
    })
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="mapMarkerImg"/>

          <h2>Escolha um orfanato do mapa</h2>
          <p>Muitas criancas estao esperando sua visita</p>
        </header>

        <footer>
          <strong>Sao Paulo</strong>
          <span>Sao Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-31.3152078,-48.8432474]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
      <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {orphanages.map(orphanage => {
        return (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude,orphanage.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
              {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
              <FiArrowRight size={20} color='#fff'/>
            </Link>
          </Popup>
          </Marker>
        )
      })}

      </Map>

      <Link to='/orphanages/create' className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap;
