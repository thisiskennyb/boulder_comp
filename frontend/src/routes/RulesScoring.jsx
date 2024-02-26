export default function RulesScoring () {
    return (
    <>
<h2>Scoring System:</h2>

<ol>
  <li>
    <h3>Boulder Grade Scoring:</h3>
    <p>Your score is based on the difficulty of the boulders you successfully complete.</p>
    <ul>
      <li>You earn:</li>
      <li><strong>3 points</strong> for sending a boulder equal in difficulty to your hardest completed grade.</li>
      <li><strong>2 points</strong> for the second hardest completed grade.</li>
      <li><strong>1 point</strong> for the third hardest completed grade.</li>
    </ul>
    <p>For example, if your hardest completed boulder grade is v7:</p>
    <ul>
      <li>Completing a v7 boulder earns you 3 points.</li>
      <li>Completing a v6 boulder earns you 2 points.</li>
      <li>Completing a v5 boulder earns you 1 point.</li>
    </ul>
  </li>
  
  <li>
    <h3>Flash Bonus:</h3>
    <p>If you complete a boulder on your first attempt (flash), your score for that send will be doubled.</p>
  </li>
  
  <li>
    <h3>League Winner:</h3>
    <p>The team with the highest combined score when the league ends is declared the winner.</p>
  </li>
</ol>

<h3>Example:</h3>
<ul>
  <li>Suppose a user's hardest completed boulder grade is v7.</li>
  <li>If they flash a v7 boulder, they earn 6 points (3 points doubled).</li>
  <li>If they complete a v6 boulder on their second attempt, they earn 2 points.</li>
  <li>If they later complete a v5 boulder, they earn 1 point.</li>
</ul>

<p>This scoring system encourages climbers to challenge themselves and rewards both consistency and skillful climbing.</p>
</>)
}