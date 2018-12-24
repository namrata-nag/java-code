package linkList;

public class SingleLinkList {
	    Node head; 
		public class Node{
			int data;
			Node next;
			Node(int x){
				data = x;next = null;
			}
		}
		void append(int data){
			Node o1 = new Node(data);
			if(head == null){
				head = o1;
				return;
				
			}
			Node temp = head;
			while(temp.next != null){
				temp =temp.next;
			}
			temp.next = o1;
			//o1.next =null;
			
			
		}
		void insert(int data,int pos){
			Node node = new Node(data);
			if(pos == 1){
				node.next = head;
				head = node;
				
				return;
			}
			if(head == null){
				System.out.print("NO LIST EXXIST");
				return;
			}
			Node temp = head;
			int count = 1;
			while(temp != null ){
				count++;
				if(count == pos ){
					node.next = temp.next;
					temp.next = node;
					return;
					
				}
				temp = temp.next;
			}
		}
		void print(){
			Node temp =head;
			while(temp != null){
				System.out.print(temp.data);
				temp = temp.next;
			}
			
		}
		void delete(int d){
			
		}
		public static void main(String str[]){
			SingleLinkList obj = new SingleLinkList();
			SingleLinkList obj1 = new SingleLinkList();
			obj.append(6);
			obj.append(7);
			obj.append(8);
			obj.insert(5,1);
			obj.insert(9,3);
			obj.print();
			
		}
}
