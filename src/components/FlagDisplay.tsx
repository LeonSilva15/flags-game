import './FlagDisplay.css';

type Props = { code: string };

export function FlagDisplay({ code }: Props) {
    const imagePath = `${import.meta.env.BASE_URL}flags/${code}.svg`;
    return <img className="flag" src={imagePath} alt={code} />;
}
