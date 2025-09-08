interface Props {
  placeholder?: string;
}
export const CustomSearch = ({ placeholder = "buscar" }: Props) => {
  return (
    <div className="search-container">
      <input type="text" placeholder={placeholder} />
      <button>Buscar</button>
    </div>
  );
};
