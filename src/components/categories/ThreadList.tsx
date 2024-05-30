import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './forum.scss';

interface Thread {
  id: number;
  title: string;
  content: string;
  category: string;
  link: string;
}

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <Container>
      <br />
      <p className="text-light">Posted threads:</p>
      <Row>
        {threads.map((thread) => (
          <Col key={thread.id} xs={12} sm={6} md={4} lg={3} className="mb-2">
            <Link to={thread.link} className="text-decoration-none text-light">
              {thread.title}
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ThreadList;
