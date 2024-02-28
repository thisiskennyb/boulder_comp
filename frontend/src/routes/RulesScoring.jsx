export default function RulesScoring() {
  return (
    <div className="bg-lightgray font-nunito text-center min-h-screen py-4">
      <h2>Scoring System:</h2>

      <div>
        <h3>Boulder Grade Scoring:</h3>
        <p>Your score is based on the difficulty of the boulders you successfully complete.</p>
        <div>
          <p>You earn:</p>
          <div>
            <div>&bull; <strong>3 points</strong> for sending a boulder equal in difficulty to your hardest completed grade.</div>
            <div>&bull; <strong>2 points</strong> for the second hardest completed grade.</div>
            <div>&bull; <strong>1 point</strong> for the third hardest completed grade.</div>
          </div>
          <p>For example, if your hardest completed boulder grade is v7:</p>
          <div>
            <div>&bull; Completing a v7 boulder earns you 3 points.</div>
            <div>&bull; Completing a v6 boulder earns you 2 points.</div>
            <div>&bull; Completing a v5 boulder earns you 1 point.</div>
          </div>
        </div>
      </div>

      <div>
        <h3>Flash Bonus:</h3>
        <p>If you complete a boulder on your first attempt (flash), your score for that send will be doubled.</p>
      </div>

      <div>
        <h3>League Winner:</h3>
        <p>The team with the highest combined score when the league ends is declared the winner.</p>
      </div>

      <h3>Example:</h3>
      <div>
        <p>Suppose a user's hardest completed boulder grade is v7.</p>
        <div>
          <div>&bull; If they flash a v7 boulder, they earn 6 points (3 points doubled).</div>
          <div>&bull; If they complete a v6 boulder on their second attempt, they earn 2 points.</div>
          <div>&bull; If they later complete a v5 boulder, they earn 1 point.</div>
        </div>
      </div>

      <p>This scoring system encourages climbers to challenge themselves and rewards both consistency and skillful climbing.</p>
    </div>
  );
}
