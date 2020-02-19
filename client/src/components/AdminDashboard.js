import React from 'react';
import { Link } from 'react-router-dom';
import { getUserInStorage } from '../utils/localStorage';
import { Container, Header, Grid, Segment } from 'semantic-ui-react';

const AdminDashboard = () => {

    const { _id, name, email, role } = getUserInStorage();


    return (
        <section>
            <Container>
                <Segment>
                    <Header as='h2'>Admin Links</Header>
                    <Grid>
                        <Grid.Row>

                            <Grid.Column width={4}>
                                <Segment attached='top'>
                                    <Link to='/admin/create/category'>Create Category</Link>
                                </Segment>
                                <Segment attached>Segment 2</Segment>
                            </Grid.Column>

                            <Grid.Column width={12}>
                                <p>Inside 13 column</p>
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </section>
    );
};


export default AdminDashboard;