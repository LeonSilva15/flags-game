import ReactCountryFlag from "react-country-flag";

type Props = { code: string };

export function FlagDisplay({code}: Props) {
    return (
        <div className="border shadow-md p-4">
            <ReactCountryFlag countryCode={code} svg style={{height: '40vh', width: '30wh'}}/>
        </div>
    );
}
