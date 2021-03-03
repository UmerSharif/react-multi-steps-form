import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Container, ThemeProvider, Typography } from '@material-ui/core';
import { GreenButton } from '../FormControl/FormControl';
import { Theme } from '../../Theme';
import Header from '../Header/Header';
import React, { Component } from 'react';

class Error404 extends Component {
  constructor(props) {
    super(props);
    this.redirectPage = this.redirectPage.bind(this);
  }

  state = { redirect: false };

  redirectPage() {
    this.setState({ redirect: true });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ redirect: true }), 20000);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Header />
        <div className="top-container" style={{ padding: '50px' }}>
          <ThemeProvider theme={Theme}>
            <Container maxWidth="sm">
              <Typography variant="h3">Error Accessing Link</Typography>

              <p>
                The link you tried to access either never existed or has
                expired.
              </p>
              <p>
                You will be redirected automaticlly within 20 seconds to the
                talent application page.
              </p>
              <p>
                If you are not automaticlly redirected please click the button
                below.
              </p>
              <GreenButton
                size="large"
                variant="contained"
                color="primary"
                onClick={this.redirectPage}
              >
                Talent Application Form
              </GreenButton>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}

export default withRouter(Error404);
