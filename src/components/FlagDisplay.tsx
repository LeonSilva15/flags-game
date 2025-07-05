type Props = { code: string };

export function FlagDisplay({ code }: Props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
                src={`${import.meta.env.BASE_URL}flags/${code}.svg`}
                alt={code}
                style={{ height: '30rem' }}
            />
        </div>
    );
}
