export interface User {
  user: number;
  name: string;
  location: string;
  role: string;
  id: number;
}

export const getUserAction = async (id: number) => {
  await new Promise((res) => setTimeout(res, 2000));
  return {
    id: id,
    user: 123,
    name: "Joaquin Aldunate",
    location: "Santiago, Chile",
    role: "analista de procesos",
  };
};
