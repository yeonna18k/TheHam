import { Participant } from '../../../types/Participant';

export const ParticipantList = ({ participants }: { participants: Participant[] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-medium mb-2">참여자 ({participants.length}명)</h3>
      <div className="flex space-x-2">
        {participants.map(participant => (
          <div key={participant.id} className="flex flex-col items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: participant.color }}
            >
              {participant.name.charAt(0)}
            </div>
            <span className="text-xs mt-1">{participant.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};