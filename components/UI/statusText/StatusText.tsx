import './statusText.scss';

const StatusText = ({ status }: any) => {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const newStatus = status.toLowerCase();

  return <p className={status}>{capitalizeFirstLetter(newStatus)}</p>;
};

export default StatusText;
