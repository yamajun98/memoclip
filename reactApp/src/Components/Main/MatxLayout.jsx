import  MatxSuspense  from '../../Setteing/option/Suspense';
import useSettings from '../../Setteing/useSettings';
import { MatxLayouts } from './index';

/*
  全体の大枠
*/
const MatxLayout = (props) => {
  const { settings } = useSettings();
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
};

export default MatxLayout;
