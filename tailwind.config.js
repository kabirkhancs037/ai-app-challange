export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
    colors: {
        white: "#FFFFFF",

        zetaBlue: {
          DEFAULT: "#3472CE",
          light: {
            1: "#6CA2F3",
            2: "#9AC3FF",
            3: "#C1DAFF",
            4: "#E3EEFF",
            5: "#F6FAFF",
          },
          dark: {
            1: "#244FA1",
            2: "#112681",
            3: "#050761",
            4: "#050751",
            5: "#010235",
          },
        },

        zetaGray: {
          DEFAULT: "#536266",
          light: {
            1: "#67767A",
            2: "#7A8A8E",
            3: "#8E9DA2",
            4: "#A1B1B6",
            5: "#B5C5CA",
          },
          dark: {
            1: "#49565D",
            2: "#3F4A53",
            3: "#363F4A",
            4: "#2C3340",
            5: "#222737",
          },
        },

        zetaSilver: {
          DEFAULT: "#D8D8D8",
          light: {
            1: "#DFDFDF",
            2: "#E5E6E6",
            3: "#ECECED",
            4: "#F2F3F4",
            5: "#F9FAFB",
          },
          dark: {
            1: "#C7C9CC",
            2: "#B6BAC0",
            3: "#A5AAB3",
            4: "#949BA7",
            5: "#7F8A9D",
          },
        },

        zetaBrandBlue: {
          DEFAULT: "#336699",
          light: {
            1: "#507CA8",
            2: "#6C92B7",
            3: "#89A7C6",
            4: "#A5BDD5",
            5: "#C2D3E4",
          },
          dark: {
            1: "#295B8C",
            2: "#1F4F80",
            3: "#144473",
            4: "#0A3867",
            5: "#002D5A",
          },
        },

        zetaGreen: {
          DEFAULT: "#24A148",
          light: {
            1: "#4EB959",
            2: "#85D181",
            3: "#C6EABE",
            4: "#E5F5DE",
            5: "#F3FAEE",
          },
          dark: {
            1: "#038628",
            2: "#026B25",
            3: "#015126",
            4: "#003625",
            5: "#001B1B",
          },
        },

        zetaOrange: {
          DEFAULT: "#F5A623",
          light: {
            1: "#F7B62F",
            2: "#F9C53B",
            3: "#FBD548",
            4: "#FDE454",
            5: "#FFF460",
          },
          dark: {
            1: "#E5941D",
            2: "#D58217",
            3: "#C47111",
            4: "#B45F0B",
            5: "#A44D05",
          },
        },

        zetaPurple: {
          DEFAULT: "#9A72BD",
          light: {
            1: "#AE86CA",
            2: "#C29AD7",
            3: "#D7AEE5",
            4: "#EBC2F2",
            5: "#FFD6FF",
          },
          dark: {
            1: "#8B62B8",
            2: "#7B52B3",
            3: "#6C41AF",
            4: "#5C31AA",
            5: "#4D21A5",
          },
        },

        zetaRed: {
          DEFAULT: "#D0021B",
          light: {
            1: "#D92438",
            2: "#E34655",
            3: "#EC6872",
            4: "#F68A8F",
            5: "#FFACAC",
          },
          dark: {
            1: "#B90221",
            2: "#A20126",
            3: "#8A012C",
            4: "#730031",
            5: "#5C0037",
          },
        },

        // Semantic aliases used across apps
        border: "#D9E1EC",
        panel: "#071322",
        dark: "#020B15",

        blue: "#3472CE",
        gray: "#536266",
        silver: "#ECECED",
        green: "#24A148",
        orange: "#F5A623",
        purple: "#9A72BD",
        red: "#D0021B",
    },
  },
},
  plugins: [],
};