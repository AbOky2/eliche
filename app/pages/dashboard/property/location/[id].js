import { getPropertyApiMethod } from 'lib/api/customer';
import Single from 'components/page/single';
import withAuth from 'lib/withAuth';

const PropertyPage = (props) => <Single {...props} isLocation />;
PropertyPage.getInitialProps = async ({ req, res, query: { id } }) => {
  if (req && !req.user) {
    res.redirect('/');
    return { partners: [] };
  }
  const headers = {};
  if (req && req.headers && req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }
  try {
    const property = await getPropertyApiMethod(id, { headers });
    return { property, id };
  } catch (error) {
    return { property: {}, id: null };
  }
};

export default withAuth(PropertyPage, { noHeaderMargin: true });
