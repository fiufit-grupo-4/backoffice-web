import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import { Card, ListGroup, ListGroupItem, Badge, Button } from "react-bootstrap";
import { Link, useParams,useLocation } from "react-router-dom";


export default function UserProfile() {
    //const useLocation = useLocation()
    //const id = new URLSearchParams(location.search).get("id");

    const { userId } = useParams();
    const [user, setUser] = useState(null);
  
    /*
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      };
      fetchUser();
    }, [userId]);
  
    if (!user) {
      return <div>Loading...</div>;
    }*/
  
    return (
      <div>
        <Sidebar></Sidebar>
        <Link to="/users">Back to Users</Link>
        <Card>
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {user.email}
            </Card.Subtitle>
            <ListGroup className="mb-3">
              <ListGroupItem>
                <b>Phone:</b> {user.phone}
              </ListGroupItem>
              <ListGroupItem>
                <b>Address:</b> {user.address}
              </ListGroupItem>
              <ListGroupItem>
                <b>Company:</b> {user.company}
              </ListGroupItem>
            </ListGroup>
            <div>
              <Button variant="primary">Edit Profile</Button>{" "}
              <Button variant="danger">Block User</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );


}


/*

import React, { useState, useEffect } from "react";
import { Card, ListGroup, ListGroupItem, Badge, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/users">Back to Users</Link>
      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.email}
          </Card.Subtitle>
          <ListGroup className="mb-3">
            <ListGroupItem>
              <b>Phone:</b> {user.phone}
            </ListGroupItem>
            <ListGroupItem>
              <b>Address:</b> {user.address}
            </ListGroupItem>
            <ListGroupItem>
              <b>Company:</b> {user.company}
            </ListGroupItem>
          </ListGroup>
          <div>
            <Button variant="primary">Edit Profile</Button>{" "}
            <Button variant="danger">Block User</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfile;


*/