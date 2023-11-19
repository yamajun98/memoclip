import { styled } from '@mui/system';
import MatxVerticalNav from './items/MatxVerticalNav';
import { navigations } from '../../../Route/navigations';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
/*
サイバーの要素
*/
const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',  
  paddingRight: '1rem',
  position: 'relative',
}));

const Sidenav = () => {
  return (
    <Fragment>
      <Scrollbar options={{ suppressScrollX: true }}>
        <MatxVerticalNav items={navigations} />
      </Scrollbar>
    </Fragment>
  );
};

export default Sidenav;
