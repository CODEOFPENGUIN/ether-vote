pragma solidity ^0.4.24;
import "./Ownable.sol";
//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract VoteContract is Ownable {
    //using strings for *;
    
    struct voter {
        string name;
        bool voted;
    }

    struct vote {
        mapping(uint => candidate) candidates;
        uint candidateSeq;
        mapping(address => voter) voters;
        int voteCnt;
        bool isEnd;
        string voteName;
    }

    struct candidate {
        string name;
        string imgPath;
        address[] voters;
    }

    mapping(uint256 => vote) voteHst;
    uint256 voteSeq = 0;

    function addCandidate(uint256 vSeq, string memory _name, string memory _imgPath) public onlyOwner {
        //require(voteHst[voteSeq].candidates[candidateSeq].voters.length > 0, "이미 기투표자가 존재합니다.");
        uint seq = voteHst[vSeq].candidateSeq;
        voteHst[vSeq].candidates[seq].name = _name;
        voteHst[vSeq].candidates[seq].imgPath = _imgPath;
        voteHst[vSeq].candidateSeq += 1;
    }

    function addVote(string memory vName) public onlyOwner {
        voteHst[voteSeq].isEnd = false;
        voteHst[voteSeq].voteName = vName;
        voteHst[voteSeq].voteCnt = 0;
        voteSeq += 1;
    }
    function voting(uint256 vSeq, uint cSeq, string memory _name) public {
        voteHst[vSeq].voters[msg.sender].name = _name;
        voteHst[vSeq].voters[msg.sender].voted = true;
        voteHst[vSeq].voteCnt += 1;
        voteHst[vSeq].candidates[cSeq].voters.push(msg.sender);
    }
    
    function getVoteCount(uint256 vSeq) public view returns (int) {
        return voteHst[vSeq].voteCnt;
    }

    function isVoted(uint256 vSeq, address vt) public view returns (bool){
        return voteHst[vSeq].voters[vt].voted;
    }

    function getVoteName(uint256 vSeq) public view returns (uint256 key, string value){
        key = vSeq;
        value = voteHst[vSeq].voteName;
    }

    function getVoteSeq() public view returns(uint256){
        return voteSeq;
    }

    function getWinner(uint256 vSeq) public view returns (string winnerName, int voteCnt) {
        voteCnt = -1;
        for(uint i = 0; i < voteHst[vSeq].candidateSeq; i++){
            int vCnt = int(voteHst[vSeq].candidates[i].voters.length);
            if(voteCnt < vCnt) {
                voteCnt = vCnt;
                winnerName = voteHst[vSeq].candidates[i].name;
            }
        }
    }
    function getVoters(uint256 vSeq, uint256 cSeq, uint inx) public view onlyOwner returns (address) {
        return voteHst[vSeq].candidates[cSeq].voters[inx];
    }
    
    // function getCandidateList(uint256 vSeq) public view returns (string) {
    //     string memory rev = "[";
    //     for(uint i = 0; i < voteHst[vSeq].candidateSeq; i++){
    //        rev = rev.toSlice().concat("{\"name\":\"".toSlice());
    //        rev = rev.toSlice().concat(voteHst[vSeq].candidates[i].name.toSlice());
    //        rev = rev.toSlice().concat("\",\"imgPath\":\"".toSlice());
    //        rev = rev.toSlice().concat(voteHst[vSeq].candidates[i].imgPath.toSlice());
    //        rev = rev.toSlice().concat("\"}".toSlice());
    //        if(i != voteHst[vSeq].candidateSeq -1){
    //         rev = rev.toSlice().concat(",".toSlice());
    //        }
    //     }
    //     rev = rev.toSlice().concat("]".toSlice());
        
    //     return rev;
    // }
    
    function getCandidateList(uint256 vSeq, uint256 cSeq) public view returns (string _name, string _imgPath) {
        _name = voteHst[vSeq].candidates[cSeq].name;
        _imgPath = voteHst[vSeq].candidates[cSeq].imgPath;
    }
    
    function getCandidateCnt(uint256 vSeq) public view returns (uint) {
        return voteHst[vSeq].candidateSeq;
    }
}