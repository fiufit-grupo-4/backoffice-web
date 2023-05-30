import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { DEFAULT_IMAGE } from '../../utils/constants';

const TrainingMediaCarousel = ({ media }) => {
  return (
    <Carousel indicators={false} prevLabel="" nextLabel="" style={{marginBottom:20}}>
      {media.map((item, index) => (
        <Carousel.Item key={index}>
          {item.media_type === 'image' ? (
            item.url 
            ? <Image src={item.url} className="d-block mx-auto" alt={`Image ${index}`} width="260" height="260"/>
            :  <Image src={DEFAULT_IMAGE} className="d-block mx-auto" alt={`Image ${index}`} width="260" height="260"/>
           
          ) : (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40vh',
              }}>
            <ReactPlayer url={item.url} controls width="80%" height="100%"  />
            </div>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default TrainingMediaCarousel;