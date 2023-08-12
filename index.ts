const BBS = "https://bbs.barabariproject.org";

interface BResponse {
  success: boolean;
  body: any;
}

// sensible defaults
const routes = {
  i1: {
    get: async (path, options = {}, type = "text"): Promise<BResponse> => {
      let error = null;
      const res = await fetch(BBS + "/i1/" + path, options)
        .catch((e) => error = e);
      const status = res.status;
      if (status === 200) {
        return {
          success: true,
          body: await res[type]()
        }
      } else {
        return {
          success: false,
          body: error || await res.text()
        }
      }
    }
  }
};

export default routes;

// Sample
/*
  import routes from './routes';

  const svg = await routes.i1.GET('fab:github');
  console.log(svg);
*/