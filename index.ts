const BBS = "https://bbs.barabariproject.org";

interface BResponse {
  success: boolean;
  body: any;
}

// sensible defaults
export const i1 = {
  // does not request, only returns the url
  none: (path, options = {}) => {
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

export const p1 = {
  none: (url: string): string => BBS + "/p1/?url=" + url,
}

export default {
  i1, p1
}
