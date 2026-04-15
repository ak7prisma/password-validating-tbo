export interface HeaderProps {
  isSuccess: boolean;
  username: string;
}

export const Header = ({ isSuccess, username }: HeaderProps) => {
    return (
        <>
            <h2 className={`text-2xl font-black text-center tracking-widest mb-4 ${isSuccess ? 'text-green-500' : 'text-red-600'}`}>
                {isSuccess ? 'REGISTRATION SUCCESS' : 'REGISTRATION FAILED'}
            </h2>
            <p className="text-center font-bold mb-6">
                {isSuccess ? (
                <>Welcome to the Republic, <span className="text-orange-500">{username}</span>.</>
                ) : (
                'Access Denied by Security Policy.'
                )}
            </p>
        </>
    );
};