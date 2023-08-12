const BBS = "https://bbs.barabariproject.org";

interface BResponse {
  success: boolean;
  body: any;
}

// sensible defaults
const routes = {
  i1: {
    static: (path, options = {}) => {
      let search = new URLSearchParams(options).toString();
      if (search) search = "?" + search;

      return BBS + "/i1/" + path + search;
    },
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

// Sample GET
/*
  import BBS from './routes';

  const svg = await BBS.i1.get('fab:github');
  console.log(svg);
*/

// Sample STATIC
/*
  import BBS from './routes';

  const svg = BBS.i1.static('fab:github', { size: 32 });
  // https://bbs.barabariproject.org/i1/fab:github?size=32
*/